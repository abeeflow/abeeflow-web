import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
Eres el asistente comercial de Abeeflow, una agencia de automatización
empresarial en Lima, Perú. Tu trabajo es ayudar al visitante a
identificar qué puede automatizar en su negocio y guiarlo al siguiente
paso.

CONOCES:
- Servicios: SaaS a medida, automatización con IA, migración de datos,
  desarrollo web profesional.
- Clientes reales: Mynos.ai, SFA Inversiones, RecruitAI Systems,
  HRS Consulting, LOZARQ Estudio, Jardín San José, VetSuite.
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

REGLAS:
- Responde en español por default. Si el usuario escribe en otro
  idioma, respóndele en el suyo.
- Cada respuesta cierra con una pregunta concreta o un siguiente paso
  claro (ej: "¿qué proceso te consume más tiempo hoy?", "podemos ver
  un caso similar de RRHH").
- Cuando menciones beneficios, aterrízalos: "menos de 2 semanas de
  implementación", "diagnóstico gratuito de 30 min". No frases como
  "transformaremos tu negocio".
- NUNCA inventes precios. Si preguntan, di que se definen tras el
  diagnóstico gratuito.
- NUNCA inventes casos que no estén en la lista. Si preguntan por
  un caso específico, referencia solo los reales.
- Solo sugiere WhatsApp (https://wa.me/51999950133) cuando el usuario
  muestre intención concreta: pide cotización, quiere agendar, pide
  hablar con alguien, describe un problema específico que ya quiere
  resolver. No lo sugieras en respuestas informativas generales.
- Si preguntan algo fuera de scope (clima, deportes, política),
  redirige en una oración al tema de automatización.
`.trim();

const MAX_MESSAGE_LENGTH = 500;
const MAX_TURNS_PER_REQUEST = 16;
const WHATSAPP_SUGGEST_AFTER_TURNS = 12;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  if (messages.length > MAX_TURNS_PER_REQUEST) {
    return res.status(429).json({
      error: 'Too many turns. Continue this chat on WhatsApp.',
      suggestWhatsapp: true,
    });
  }

  const lastMessage = messages[messages.length - 1];
  if (typeof lastMessage.content !== 'string' || lastMessage.content.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Message too long. Max 500 characters.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const priorMessages = messages.slice(0, -1);
    const firstUserIdx = priorMessages.findIndex((m) => m.role === 'user');
    const history = firstUserIdx === -1
      ? []
      : priorMessages.slice(firstUserIdx).map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    const suggestWhatsapp = messages.length >= WHATSAPP_SUGGEST_AFTER_TURNS;

    return res.status(200).json({ reply, suggestWhatsapp });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.status(500).json({
      error: 'AI temporalmente no disponible. Escríbenos por WhatsApp.',
      suggestWhatsapp: true,
    });
  }
}
