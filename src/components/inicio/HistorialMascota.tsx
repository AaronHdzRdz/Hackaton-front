'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  pulso: {
    promedioDiario: string;
    promedioSemanal: string;
  };
  alimentosConsumidos: Array<{
    dia: string;
    cantidad: string;
  }>;
  actividad: {
    promedioDiario: string;
    promedioSemanal: string;
  };
  alertas: Array<{
    mensaje: string;
    hora: string;
  }>;
}

export default function HistorialMascota() {
  const [historial, setHistorial] = useState<Props | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const petId = '67e763ae1a23ac232de390bc'; // Cambia al id real

  useEffect(() => {
    const obtenerDatosMascota = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/health/state/${petId}`);

        // Mapea los datos desde tu backend hacia la interfaz exacta requerida
        const historialMascota: Props = {
          pulso: {
            promedioDiario: `${data.heartRate.value} bpm`,
            promedioSemanal: data.heartRate.estado,
          },
          alimentosConsumidos: [
            { dia: 'Hoy', cantidad: 'Pendiente backend' },
            { dia: 'Ayer', cantidad: 'Pendiente backend' },
          ],
          actividad: {
            promedioDiario: `${data.activity.value} min`,
            promedioSemanal: data.activity.estado,
          },
          alertas: data.estadoGeneral !== 'Normal'
            ? [{ mensaje: data.estadoGeneral, hora: 'Reciente' }]
            : [],
        };

        setHistorial(historialMascota);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosMascota();
  }, [petId]);

  if (loading) return <div>Cargando historial...</div>;
  if (error) return <div>{error}</div>;
  if (!historial) return <div>No hay datos disponibles.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Historial de Salud</h2>

      <div className="my-4">
        <h3 className="font-semibold">Pulso</h3>
        <p>Promedio Diario: {historial.pulso.promedioDiario}</p>
        <p>Promedio Semanal: {historial.pulso.promedioSemanal}</p>
      </div>

      <div className="my-4">
        <h3 className="font-semibold">Alimentos Consumidos</h3>
        {historial.alimentosConsumidos.map((alimento, idx) => (
          <p key={idx}>{alimento.dia}: {alimento.cantidad}</p>
        ))}
      </div>

      <div className="my-4">
        <h3 className="font-semibold">Actividad Física</h3>
        <p>Promedio Diario: {historial.actividad.promedioDiario}</p>
        <p>Promedio Semanal: {historial.actividad.promedioSemanal}</p>
      </div>

      {historial.alertas.length > 0 && (
        <div className="my-4 text-red-500">
          <h3 className="font-semibold">Alertas Recientes</h3>
          {historial.alertas.map((alerta, idx) => (
            <p key={idx}>{alerta.mensaje} - {alerta.hora}</p>
          ))}
        </div>
      )}
    </div>
  );
}
