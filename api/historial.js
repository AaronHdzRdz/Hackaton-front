// src/api/health.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHealthStatus(petId: string) {
  const res = await fetch(`${API_URL}/api/health/state/:petId/${petId}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Error al obtener el estado de salud.');
  }

  return res.json();
}
