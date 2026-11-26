// Chat del sitio. Vercel publica este archivo en /api/chat.
// Recibe la conversación y devuelve la respuesta de un modelo de NVIDIA.

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const WHATSAPP_URL = 'https://wa.me/51999950133';

// Se prueban en orden: si el primero falla, responde el siguiente.
const MODELS = [
  'nvidia/nemotron-3.5-bolt-e4b',
  'nvidia/nemotron-3.5-lightning-30b-a3b',
];
const MODEL_TIMEOUT_MS = 12000;

// 13 mensajes son 7 preguntas del visitante. Después se pasa a WhatsApp.
const MAX_MESSAGES = 13;
const MAX_MESSAGE_CHARS = 1000;

// El modelo agrega esta marca cuando conviene pedir los datos de contacto.
// Se quita antes de responder y el chat muestra el formulario.
const CONTACT_MARK = '[[CONTACTO]]';

// Respaldo por si el modelo olvida la marca: el visitante pide algo
// que solo se resuelve hablando con el equipo.
const CONTACT_INTENT =
  /agend|reuni[oó]n|cita|cotiza|presupuesto|precio|cu[aá]nto cuesta|hablar con|llamada|ll[aá]mame|cont[aá]ct|schedule|book|meeting|quote|pricing|talk to/i;

const SYSTEM_PROMPT = `
Eres el asistente comercial de Abeeflow, una agencia de automatización
empresarial en Lima, Perú. Tu trabajo es ayudar al visitante a
identificar qué puede automatizar en su negocio y guiarlo al siguiente
paso.

CONOCES:
- Servicio principal: automatización con RPA + IA. Migramos bots de
  UiPath, Blue Prism y Automation Anywhere a Python ($0 en licencias)
  y sumamos agentes de IA.
- También: SaaS a medida, migración de datos, desarrollo web.
- Clientes reales: Mynos.ai, SFA Inversiones, RecruitAI Systems,
  HRS Consulting, LOZARQ Estudio, Jardín San José.
- Producto propio: VetSuite, sistema para clínicas veterinarias, con
  demo pública en vetsuite.abeeflow.com/demo/.
- Industrias con casos: RRHH, finanzas, arquitectura, educación,
  veterinaria.
- Implementación típica: menos de 2 semanas.
- Diagnóstico inicial: 30 minutos, gratuito, sin compromiso.

TONO:
- Profesional, directo, orientado a resultados. Habla como consultor,
  no como vendedor.
- Sin adjetivos vacíos ("increíble", "asombroso", "revolucionario").
- Sin emojis (excepto un 👋 en el saludo si aplica).
- Máximo 3 oraciones por respuesta.
- Trata al usuario de tú, nunca de usted.

REGLAS:
- Responde en español por default. Si el usuario escribe en otro
  idioma, respóndele en el suyo.
- Cada respuesta cierra con una pregunta concreta o un siguiente paso
  claro (ej: "¿Qué proceso te consume más tiempo hoy?", "Podemos ver
  un caso similar de RRHH").
- Cuando menciones beneficios, aterrízalos: "menos de 2 semanas de
  implementación", "diagnóstico gratuito de 30 min". No frases como
  "transformaremos tu negocio".
- NUNCA inventes precios. Si preguntan, di que se definen tras el
  diagnóstico gratuito.
- NUNCA inventes casos que no estén en la lista. Si preguntan por
  un caso específico, referencia solo los reales.
- Cuando el usuario muestre intención concreta (quiere agendar, pide
  cotización o precio, pide hablar con alguien, o describe un problema
  específico que ya quiere resolver), dile en una oración que deje su
  nombre y su correo o WhatsApp en el formulario que aparece aquí abajo,
  que el equipo le escribe en breve y que también puede elegir un
  horario. No le pidas que escriba él por WhatsApp. Termina esa
  respuesta con la marca ${CONTACT_MARK} (el visitante no la ve).
- No pongas la marca en respuestas informativas generales.
- Si preguntan algo fuera de scope (clima, deportes, política),
  redirige en una oración al tema de automatización.
`.trim();

// Pide una respuesta a un modelo. Lanza un error si no hay texto útil.
async function askModel(model, messages) {
  const res = await fetch(NVIDIA_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 1024 }),
    signal: AbortSignal.timeout(MODEL_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  const reply = (data.choices?.[0]?.message?.content ?? '')
    // Algunos modelos anteponen su razonamiento entre <think> y </think>.
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    // Si el modelo cambia un dígito del número, se restaura el enlace oficial.
    .replace(/https?:\/\/wa\.me\/\d+/g, WHATSAPP_URL)
    .trim();
  const askContact = reply.includes(CONTACT_MARK);
  const text = reply.split(CONTACT_MARK).join('').trim();
  if (!text) throw new Error('respuesta vacía');
  return { text, askContact };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.NVIDIA_API_KEY) {
    console.error('Chat error: falta NVIDIA_API_KEY');
    return res.status(500).json({ error: 'API key not configured', suggestWhatsapp: true });
  }

  const messages = req.body?.messages;
  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every((m) => typeof m?.content === 'string');
  if (!valid) {
    return res.status(400).json({ error: 'No messages provided' });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(429).json({ error: 'Too many messages', suggestWhatsapp: true });
  }

  const conversation = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    })),
  ];

  for (const model of MODELS) {
    try {
      const { text, askContact } = await askModel(model, conversation);
      const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
      return res.status(200).json({
        reply: text,
        askContact: askContact || CONTACT_INTENT.test(lastUser),
        suggestWhatsapp: messages.length >= MAX_MESSAGES,
      });
    } catch (err) {
      console.error(`Chat error (${model}): ${err.message}`);
    }
  }
  return res.status(500).json({ error: 'AI unavailable', suggestWhatsapp: true });
}
