'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface PetPDFPreviewProps {
  petId: string;
}

export default function PetPDFPreview({ petId }: PetPDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>('Cargando...');

  useEffect(() => {
    const fetchPetName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${petId}`);
        setPetName(response.data.name || 'Sin nombre');
      } catch (error) {
        console.error('❌ Error al obtener el nombre de la mascota:', error);
        setPetName('Desconocido');
      }
    };

    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/health/pdf/${petId}`,
          { responseType: 'blob' }
        );

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('❌ Error al generar el PDF:', error);
      }
    };

    fetchPetName();
    fetchPdf();
  }, [petId]);

  const handleDownload = () => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `historial_${petId}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Historial de: {petName}</h2>

      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Previsualización del PDF"
          className="w-full h-[600px] border rounded-md shadow"
        />
      ) : (
        <p className="text-gray-500">Cargando PDF...</p>
      )}

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Descargar PDF
      </button>
    </div>
  );
}
