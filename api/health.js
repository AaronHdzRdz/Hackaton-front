const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const obtenerEstadoSalud = async (petId) => {
  try {
    // Corregimos el doble slash en la URL
    const res = await fetch(`${API_URL}/api/health/state/${petId}`);
    if (!res.ok) throw new Error('No se pudo obtener el estado de salud de la mascota');
    
    const data = await res.json();
    return data.heartRate;  // Regresamos solo la frecuencia cardíaca
  } catch (error) {
    throw new Error(error.message);
  }
};
