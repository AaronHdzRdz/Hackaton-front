'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HistorialMascota from './../../../components/inicio/HistorialMascota';

interface HealthStatus {
  heartRate: {
    value: number;
    estado: string;
  };
  activity: {
    value: number;
    estado: string;
  };
  distance: {
    value: number;
    estado: string;
  };
  estadoGeneral: string;
}

export default function DefaultHistorialView() {
  const [historial, setHistorial] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const petId = '67e763ae1a23ac232de390bc'; // <-- Cambia esto por el id real de tu mascota

  useEffect(() => {
    const obtenerDatosMascota = async () => {
      try {
        const response = await axios.get<HealthStatus>(
          `http://localhost:5000/api/health/state/${petId}`
        );
        setHistorial(response.data);
      } catch (error) {
        console.error('Error obteniendo datos de mascota:', error);
        setError('No se pudieron obtener los datos de la mascota.');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosMascota();
  }, [petId]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;
  if (!historial) return <p>No hay datos disponibles.</p>;

  const dataParaHistorialMascota = {
    pulso: {
      promedioDiario: `${historial.heartRate.value} bpm`,
      promedioSemanal: historial.heartRate.estado,
    },
    alimentosConsumidos: [], // Debes agregar lógica para esto si existe en backend
    actividad: {
      promedioDiario: `${historial.activity.value} minutos`,
      promedioSemanal: historial.activity.estado,
    },
    alertas: historial.estadoGeneral !== 'Normal' ? [{ mensaje: historial.estadoGeneral, hora: 'Reciente' }] : [],
  };

  return <HistorialMascota {...dataParaHistorialMascota} />;
}
