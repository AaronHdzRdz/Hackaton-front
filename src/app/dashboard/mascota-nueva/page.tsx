'use client';

import { useState, useRef } from 'react';
import { Pencil, Save, Trash } from 'lucide-react';

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  tamaño: string;
  edad: number;
  peso: number;
  foto: string;
}

export default function FichaMascota({ mascota }: { mascota: Mascota }) {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<Mascota | null>({ ...mascota });
  const [preview, setPreview] = useState(formData ? formData.foto : '');
  const [eliminada, setEliminada] = useState(false);  // Estado para simular eliminación
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData(prev => ({ ...prev, foto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (editando && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const guardarCambios = () => {
    setEditando(false);
    console.log('Datos actualizados:', formData);
  };

  const eliminarMascota = () => {
    setEliminada(true); // Cambia el estado a eliminada
    setFormData(null);  // Elimina los datos de la mascota
    console.log(`Mascota eliminada: ${formData?.id}`);
  };

  if (eliminada) {
    return (
      <section className="bg-white p-6 rounded-lg shadow w-full max-w-5xl mx-auto">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#333]">🐾 Información de la Mascota</h2>
        </div>
        <div className="flex justify-center text-center">
          <p className="text-lg font-semibold text-red-600">La mascota ha sido eliminada.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#333]">🐾 Información de la Mascota</h2>
        <button
          onClick={editando ? guardarCambios : () => setEditando(true)}
          className="flex items-center gap-2 px-4 py-1 border rounded-full text-white bg-[#FB8C00] hover:bg-[#FFA726]"
        >
          {editando ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
          {editando ? 'Guardar' : 'Editar'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center md:justify">
          <div
            className="w-40 h-40 rounded-full border-4 border-[#1976D2] overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={preview} alt="Foto de la mascota" className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <p className="text-sm text-[#999] mb-1">ID</p>
              <p className="text-base font-semibold text-[#333]">{formData?.id}</p>
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Nombre</label>
              <input
                name="nombre"
                value={formData?.nombre || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-5/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Especie</label>
              <input
                name="especie"
                value={formData?.especie || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-5/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Raza</label>
              <input
                name="raza"
                value={formData?.raza || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-5/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Tamaño</label>
              <input
                name="tamaño"
                value={formData?.tamaño || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-5/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Edad</label>
              <input
                name="edad"
                type="number"
                value={formData?.edad || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-5/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#333] mb-1">Peso (kg)</label>
              <input
                name="peso"
                type="number"
                value={formData?.peso || ''}
                onChange={handleChange}
                disabled={!editando}
                className="w-6/12 text-sm bg-white border px-2 py-1 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={eliminarMascota}
          className="flex items-center gap-2 px-4 py-1 border rounded-full text-white bg-red-600 hover:bg-red-700"
        >
          <Trash className="w-4 h-4" />
          Eliminar Mascota
        </button>
      </div>
    </section>
  );
}
