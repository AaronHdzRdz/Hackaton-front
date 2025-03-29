const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';  // Asegúrate de que la URL esté configurada correctamente

export const obtenerEstadoSalud = async (petId) => {
  try {
    // Realizamos la solicitud al backend con el petId específico
    const res = await fetch(`${API_URL}/api/health/state/${petId}`);
    
    if (!res.ok) throw new Error('No se pudo obtener el estado de salud de la mascota');
    
    const data = await res.json();  // Convertimos la respuesta a formato JSON
    return data;  // Retornamos los datos completos (pulso, actividad, etc.)
  } catch (error) {
    throw new Error(error.message);  // Si hay un error, lo lanzamos
  }
};
