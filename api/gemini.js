// src/api/gemini.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getChat(message) {
  console.log("Mensaje recibido en el frontend:", message); // Log para depuración
  try {
    const res = await fetch(`${API_URL}/api/gemini/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data.response;

  } catch (error) {
    console.error('Error al comunicarse con la API:', error);
    throw error;
  }
}
