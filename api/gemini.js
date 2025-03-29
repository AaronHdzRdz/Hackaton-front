// src/api/gemini.js

export async function getChat(message) {
    // Leer la URL desde las variables de entorno
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
    // Realizamos el fetch a la ruta correcta del backend
    const res = await fetch(`${API_URL}/api/gemini/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),  // Enviamos el mensaje al backend
    });
  
    // Si la respuesta es correcta, extraemos el contenido generado por Gemini
    const data = await res.json();
    return data.response;  // Regresamos la respuesta de la IA
  }
  
