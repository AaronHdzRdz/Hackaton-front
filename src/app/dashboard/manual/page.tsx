'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegistrarHistorialManualPage() {
  const [formData, setFormData] = useState({
    petId: '',
    fecha: '',
    temperatura: '',
    frecuenciaRespiratoria: '',
    observaciones: '',
    diagnostico: '',
    tratamiento: '',
    creadoPor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/historial', {
        ...formData,
        temperatura: parseFloat(formData.temperatura),
        frecuenciaRespiratoria: parseInt(formData.frecuenciaRespiratoria),
      });
      alert('✅ Entrada registrada correctamente.');
      setFormData({
        petId: '',
        fecha: '',
        temperatura: '',
        frecuenciaRespiratoria: '',
        observaciones: '',
        diagnostico: '',
        tratamiento: '',
        creadoPor: '',
      });
    } catch (error) {
      console.error('❌ Error al registrar entrada:', error);
      alert('Error al registrar historial.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Registrar historial clínico manual</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="petId"
          placeholder="ID de la mascota"
          value={formData.petId}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="number"
          name="temperatura"
          placeholder="Temperatura (°C)"
          value={formData.temperatura}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="frecuenciaRespiratoria"
          placeholder="Frecuencia respiratoria (rpm)"
          value={formData.frecuenciaRespiratoria}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="diagnostico"
          placeholder="Diagnóstico"
          value={formData.diagnostico}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="tratamiento"
          placeholder="Tratamiento"
          value={formData.tratamiento}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="creadoPor"
          placeholder="Veterinario (nombre o ID)"
          value={formData.creadoPor}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
