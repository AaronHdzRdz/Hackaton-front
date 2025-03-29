'use client';

import axios from 'axios';

interface DownloadPdfButtonProps {
  petId: string;
}

export default function DownloadPdfButton({ petId }: DownloadPdfButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/health/pdf/${petId}`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `historial_${petId}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('❌ Error al descargar PDF:', error);
      alert('Hubo un error al descargar el historial PDF.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      Descargar PDF
    </button>
  );
}
