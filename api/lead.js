// Datos de contacto que deja un visitante en el chat. Vercel publica este
// archivo en /api/lead. Los envía por correo (Resend) al equipo para que
// le escriban rápido, con la conversación que tuvo con el asistente y un
// resumen de ella que escribe el modelo del chat.

import { MODELS, askNvidia } from './_nvidia.js';

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

// Tiempo máximo para escribir el resumen. Si no llega, el correo sale sin él.
const SUMMARY_DEADLINE_MS = 8000;
const NOT_MENTIONED = 'No lo mencionó';

// Frases del botón "Hablar con un asesor": no cuentan como conversación.
const ADVISOR_ASKS = ['quiero hablar con un asesor.', 'i want to talk to an advisor.'];

const SUMMARY_FIELDS = [
  ['negocio', 'Negocio'],
  ['problema', 'Problema'],
  ['pidio', 'Qué pidió'],
  ['siguiente', 'Siguiente paso'],
];

const SUMMARY_PROMPT = `
Resume para el equipo comercial de abeeFlow la conversación de un visitante
con el asistente de la web. Responde SOLO con un objeto JSON válido, sin
texto antes ni después, con estas claves:
- "tema": de 2 a 5 palabras sobre de qué trata (ej: "Pedidos de bodega").
- "negocio": qué negocio o rubro tiene, en una oración.
- "problema": qué problema o tarea quiere resolver, en una oración. Incluye
  las cifras que dio (pedidos al día, horas, personas), si las dio.
- "pidio": qué pidió en concreto (precio, reunión, información...), en una oración.
- "siguiente": el siguiente paso que conviene al asesor, en una oración,
  usando el medio de contacto que dejó (correo o WhatsApp). Por ejemplo:
  "Escribirle por WhatsApp y ofrecerle el diagnóstico gratuito de 30 minutos".
Usa solo lo que dicen la conversación y el formulario; no inventes datos.
Si un dato no aparece, escribe exactamente "${NOT_MENTIONED}".
Escribe en español, sin emojis.
`.trim();

// Pide el resumen a los modelos del chat. Devuelve null si no hay nada que
// resumir, si no está la clave o si no llega a tiempo: el correo sale igual.
async function summarize({ transcript, need, isEmail }) {
  const visitorSaid = transcript.some(
    (m) => m.who === 'Visitante' && !ADVISOR_ASKS.includes(m.text.trim().toLowerCase()),
  );
  if (!process.env.NVIDIA_API_KEY || (!visitorSaid && !need)) return null;

  const input = [
    `Medio de contacto que dejó: ${isEmail ? 'correo' : 'WhatsApp'}`,
    `Qué necesita (formulario): ${need || NOT_MENTIONED}`,
    '',
    'Conversación:',
    ...transcript.map((m) => `${m.who}: ${m.text}`),
  ].join('\n');
  const messages = [
    { role: 'system', content: SUMMARY_PROMPT },
    { role: 'user', content: input },
  ];

  const deadline = Date.now() + SUMMARY_DEADLINE_MS;
  for (const model of MODELS) {
    const timeoutMs = deadline - Date.now();
    if (timeoutMs < 1000) break;
    try {
      const text = await askNvidia(model, messages, { timeoutMs, temperature: 0.2, maxTokens: 600 });
      const json = text.match(/\{[\s\S]*\}/)?.[0];
      if (!json) throw new Error('sin JSON');
      const data = JSON.parse(json);
      const pick = (key, max) => {
        const value = typeof data[key] === 'string' ? data[key].replace(/\s+/g, ' ').trim() : '';
        return value.slice(0, max) || NOT_MENTIONED;
      };
      const summary = { tema: pick('tema', 60) };
      for (const [key] of SUMMARY_FIELDS) summary[key] = pick(key, 300);
      return summary;
    } catch (err) {
      console.error(`Lead summary error (${model}): ${err.message}`);
    }
  }
  return null;
}

// Remitente con el nombre del visitante, para verlo en la bandeja de entrada:
// "Rosa Quispe vía abeeFlow Web <web@abeeflow.com>". El correo sigue
// saliendo de la dirección verificada.
const fromWithName = (from, name) => {
  const address = from.match(/<([^>]+)>/)?.[1] ?? from.trim();
  const safeName = name.replace(/["<>\\\r\n]/g, '').trim();
  return safeName ? `"${safeName} vía abeeFlow Web" <${address}>` : from;
};

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

  const summary = await summarize({ transcript, need, isEmail });
  // El tema va en el asunto solo si el modelo lo encontró.
  const topic = summary && summary.tema !== NOT_MENTIONED ? summary.tema : '';

  // Tabla con estilos en línea: es lo que los clientes de correo respetan.
  const summaryHtml = summary
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:0 0 20px;border:1px solid #E0A82E;border-radius:8px;background:#FFF8E6;border-collapse:separate">
        <tr><td colspan="2" style="padding:14px 16px 6px;font-weight:700;color:#15110D">Resumen de la conversación</td></tr>
        ${SUMMARY_FIELDS.map(
          ([key, label]) =>
            `<tr><td style="padding:4px 12px 4px 16px;font-weight:600;color:#15110D;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:4px 16px 4px 0;color:#15110D">${escapeHtml(summary[key])}</td></tr>`,
        ).join('')}
        <tr><td colspan="2" style="padding:0 0 10px"></td></tr>
      </table>`
    : '';

  // Primero, quién escribió y cómo contactarlo; después, el resumen.
  const contactHref = isEmail ? `mailto:${escapeHtml(contact)}` : waLink;
  const row = (label, value) =>
    `<tr><td style="padding:4px 12px 4px 16px;font-weight:600;color:#15110D;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:4px 16px 4px 0;color:#15110D">${value}</td></tr>`;
  const contactHtml = `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:0 0 16px;border:1px solid #D9D4CC;border-radius:8px;background:#FAF8F5;border-collapse:separate">
      <tr><td colspan="2" style="padding:14px 16px 6px;font-weight:700;color:#15110D">Datos de contacto</td></tr>
      ${row('Nombre', escapeHtml(name))}
      ${row(isEmail ? 'Correo' : 'WhatsApp', `<a href="${contactHref}" style="color:#1A5FB4">${escapeHtml(contact)}</a>`)}
      ${row('Qué necesita', need ? escapeHtml(need) : '<em>No lo escribió</em>')}
      ${page ? row('Página', escapeHtml(page)) : ''}
      <tr><td colspan="2" style="padding:10px 16px 14px"><a href="${contactHref}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#E0A82E;color:#15110D;font-weight:700;text-decoration:none">${isEmail ? `Responder a ${escapeHtml(name)}` : `Escribir a ${escapeHtml(name)} por WhatsApp`}</a></td></tr>
    </table>`;

  const html = `
    <h2 style="margin:0 0 12px">Nuevo contacto desde la web</h2>
    ${contactHtml}
    ${summaryHtml}
    ${
      transcript.length
        ? `<h3 style="margin:24px 0 8px">Conversación completa</h3>${transcript
            .map((m) => `<p style="margin:0 0 8px"><strong>${m.who}:</strong> ${escapeHtml(m.text)}</p>`)
            .join('')}`
        : ''
    }
  `;

  const text = [
    'Nuevo contacto desde la web',
    '',
    `Nombre: ${name}`,
    `${isEmail ? 'Correo' : 'WhatsApp'}: ${contact}${waLink ? ` (${waLink})` : ''}`,
    `Qué necesita: ${need || 'No lo escribió'}`,
    page && `Página: ${page}`,
    summary && ['', 'Resumen de la conversación', ...SUMMARY_FIELDS.map(([key, label]) => `${label}: ${summary[key]}`)].join('\n'),
    transcript.length && '\nConversación completa:',
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
        from: fromWithName(process.env.LEAD_FROM || DEFAULT_FROM, name),
        to,
        // Al responder el correo, la respuesta le llega al visitante.
        ...(isEmail ? { reply_to: contact } : {}),
        subject: `Nuevo contacto web: ${name}${topic ? ` · ${topic}` : ''}`,
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
