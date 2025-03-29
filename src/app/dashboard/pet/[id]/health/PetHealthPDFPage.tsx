'use client';

import { useEffect, useState } from 'react';
import axios from 'src/utils/axiosInstance';  // Asegúrate de importar axiosInstance
import { useParams } from 'next/navigation';

type Pet = {
  _id: string;
  name: string;
  species: string;
  size: string;
  age: number;
};

type HealthEntry = {
  _id: string;
  heartRate: number;
  activityMinutes: number;
  distanceKm: number;
  timestamp: string;
};

const PetHealthPDFPage = () => {
  const params = useParams();
  const petId = params.id as string;

  const [pet, setPet] = useState<Pet | null>(null);
  const [history, setHistory] = useState<HealthEntry[]>([]);

  useEffect(() => {
    if (!petId) return;

    axios.get(`/pets/${petId}`).then((res) => setPet(res.data));
    axios.get(`/health/history/${petId}`).then((res) => setHistory(res.data));
  }, [petId]);

  // const descargarPDF = async () => {
  //   try {
  //     // Llamada GET para obtener el PDF generado
  //     const response = await axios.get(`/health/pdf/${petId}`, {
  //       responseType: 'blob',  // Solicitamos un archivo (PDF)
  //     });

  //     // Convertir el blob a un objeto de URL para crear el enlace de descarga
  //     const blob = new Blob([response.data], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);

  //     // Crear un enlace para descargar el archivo
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `historial-${pet?.name || 'mascota'}.pdf`;  // Nombre del archivo
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();  // Elimina el enlace una vez que el archivo haya sido descargado
  //   } catch (error) {
  //     console.error('Error al descargar PDF:', error);
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Historial médico de <span className="text-blue-700">{pet?.name || '...'}</span>
      </h1>

      {/* Previsualización en tabla */}
      <div className="overflow-x-auto rounded shadow border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium">Fecha</th>
              <th className="px-4 py-2 font-medium">Pulso (bpm)</th>
              <th className="px-4 py-2 font-medium">Actividad (min)</th>
              <th className="px-4 py-2 font-medium">Distancia (km)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {history.map((entry) => (
              <tr key={entry._id}>
                <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleDateString()}</td>
                <td className="px-4 py-2">{entry.heartRate} bpm</td>
                <td className="px-4 py-2">{entry.activityMinutes} min</td>
                <td className="px-4 py-2">{entry.distanceKm} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      
    </div>
  );
};

export default PetHealthPDFPage;
