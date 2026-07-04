import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
Eres el asistente virtual de Abeeflow, una agencia de
automatización empresarial en Lima, Perú. Ayudas a visitantes
a entender qué pueden automatizar en sus procesos.

CONOCES:
- Servicios: SaaS a medida, automatización con IA, migración de
  datos, desarrollo web profesional
- Clientes: Mynos.ai, SFA Inversiones, RecruitAI Systems, HRS
  Consulting, LOZARQ Estudio, Jardín San José, VetSuite
- Industrias: RRHH, finanzas, arquitectura, educación, veterinaria
- Tiempo promedio de implementación: menos de 2 semanas
- Diagnóstico inicial: 30 minutos, gratuito, sin compromiso

REGLAS:
- Responde en español por default. Si el usuario escribe en otro
  idioma, responde en el suyo.
- Tono cálido pero profesional. Máximo 1 emoji por mensaje.
- Si el usuario muestra interés concreto (presupuesto, timeline,
  necesidad específica), sugiere escribir por WhatsApp con el
  link: https://wa.me/51999950133
- Si la pregunta es muy técnica o requiere alguien real, sugiere
  el WhatsApp directamente.
- Máximo 3 oraciones por respuesta. Sé conciso.
- NUNCA inventes precios. Diles que se determinan en el
  diagnóstico inicial gratuito.
- NUNCA inventes casos de éxito que no estén en la lista de
  clientes que conoces.
- Si te preguntan algo fuera de scope (clima, deportes, política),
  redirige amablemente al tema de automatización.
`.trim();

const MAX_MESSAGE_LENGTH = 500;
const MAX_TURNS_PER_REQUEST = 16;

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

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    const suggestWhatsapp = messages.length >= 6;

    return res.status(200).json({ reply, suggestWhatsapp });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.status(500).json({
      error: 'AI temporalmente no disponible. Escríbenos por WhatsApp.',
      suggestWhatsapp: true,
    });
  }
}
