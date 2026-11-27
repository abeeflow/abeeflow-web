// Llamada a los modelos de NVIDIA, compartida por el chat (/api/chat) y el
// resumen del correo de contacto (/api/lead). Vercel no publica como ruta
// los archivos de api/ que empiezan con guion bajo.

export const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Se prueban en orden: si el primero falla, responde el siguiente.
export const MODELS = [
  'nvidia/nemotron-3.5-bolt-e4b',
  'nvidia/nemotron-3.5-lightning-30b-a3b',
];

// Pide una respuesta a un modelo y devuelve el texto limpio.
// Lanza un error si la llamada falla o no hay texto.
export async function askNvidia(model, messages, { timeoutMs, temperature = 0.4, maxTokens = 1024 }) {
  const res = await fetch(NVIDIA_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  const text = (data.choices?.[0]?.message?.content ?? '')
    // Algunos modelos anteponen su razonamiento entre <think> y </think>.
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .trim();
  if (!text) throw new Error('respuesta vacía');
  return text;
}
