// Datos de contacto que deja un visitante en el chat. Vercel publica este
// archivo en /api/lead. Los envía por correo (Resend) al equipo para que
// le escriban rápido, con la conversación que tuvo con el asistente.

const RESEND_URL = 'https://api.resend.com/emails';

// A quién llega. Se puede cambiar con LEAD_TO (correos separados por coma).
const DEFAULT_TO = ['contacto@abeeflow.com', 'maria@abeeflow.com'];

// Remitente. Resend solo envía desde un dominio verificado en la cuenta;
// sin LEAD_FROM se usa el remitente de prueba de Resend, que solo entrega
// al correo dueño de la cuenta.
const DEFAULT_FROM = 'abeeFlow Web <onboarding@resend.dev>';

const MAX = { name: 80, contact: 120, need: 1000, message: 1000, transcript: 30 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Un teléfono o WhatsApp: entre 7 y 15 dígitos, con espacios, guiones o +.
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body ?? {};
  // Campo trampa: una persona no lo ve ni lo llena; un bot sí. Se responde
  // como si todo saliera bien para no darle pistas.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const contact = clean(body.contact, MAX.contact);
  const need = clean(body.need, MAX.need);
  const isEmail = EMAIL_RE.test(contact);
  const isPhone = PHONE_RE.test(contact) && contact.replace(/\D/g, '').length >= 7;

  if (!name || !(isEmail || isPhone)) {
    return res.status(400).json({ error: 'invalid', fields: { name: !name, contact: !(isEmail || isPhone) } });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Lead error: falta RESEND_API_KEY');
    return res.status(500).json({ error: 'Email not configured' });
  }

  const transcript = Array.isArray(body.transcript)
    ? body.transcript
        .filter((m) => typeof m?.content === 'string')
        .slice(-MAX.transcript)
        .map((m) => ({ who: m.role === 'user' ? 'Visitante' : 'Asistente', text: m.content.slice(0, MAX.message) }))
    : [];

  const to = (process.env.LEAD_TO ?? DEFAULT_TO.join(','))
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  const waLink = isPhone ? `https://wa.me/${contact.replace(/\D/g, '')}` : null;
  const page = clean(body.page, 200);

  const html = `
    <h2 style="margin:0 0 12px">Nuevo contacto desde la web</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>${isEmail ? 'Correo' : 'WhatsApp'}:</strong> ${
      isEmail
        ? `<a href="mailto:${escapeHtml(contact)}">${escapeHtml(contact)}</a>`
        : `<a href="${waLink}">${escapeHtml(contact)}</a>`
    }</p>
    <p><strong>Qué necesita:</strong> ${need ? escapeHtml(need) : '<em>No lo escribió</em>'}</p>
    ${page ? `<p><strong>Página:</strong> ${escapeHtml(page)}</p>` : ''}
    ${
      transcript.length
        ? `<h3 style="margin:24px 0 8px">Conversación con el asistente</h3>${transcript
            .map((m) => `<p style="margin:0 0 8px"><strong>${m.who}:</strong> ${escapeHtml(m.text)}</p>`)
            .join('')}`
        : ''
    }
  `;

  const text = [
    'Nuevo contacto desde la web',
    `Nombre: ${name}`,
    `${isEmail ? 'Correo' : 'WhatsApp'}: ${contact}${waLink ? ` (${waLink})` : ''}`,
    `Qué necesita: ${need || 'No lo escribió'}`,
    page && `Página: ${page}`,
    transcript.length && '\nConversación con el asistente:',
    ...transcript.map((m) => `${m.who}: ${m.text}`),
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const send = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM || DEFAULT_FROM,
        to,
        // Al responder el correo, la respuesta le llega al visitante.
        ...(isEmail ? { reply_to: contact } : {}),
        subject: `Nuevo contacto web: ${name}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!send.ok) {
      throw new Error(`HTTP ${send.status}: ${(await send.text()).slice(0, 300)}`);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(`Lead error: ${err.message}`);
    return res.status(502).json({ error: 'Email failed' });
  }
}
