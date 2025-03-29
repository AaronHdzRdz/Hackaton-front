'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from 'lucide-react';
import Link from 'next/link';

interface Usuario {
    id: string;
    nombre: string;
    email: string;
    foto: string;
    contraseña: string;
}

const usuarioData: Usuario = {
    id: "12345",
    nombre: "Juan Pérez",
    email: "juanperez@email.com",
    foto: "https://images.unsplash.com/photo-1611531555044-b404226643f3",
    contraseña: "12345678",
};

export default function EditarPerfilPage() {
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<Usuario>({ ...usuarioData });
    const [preview, setPreview] = useState(formData.foto);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!formData.nombre || !formData.email || !formData.contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        setEditando(false);
        console.log('Datos actualizados:', formData);
    };

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md bg-white shadow-md">
                <CardContent className="space-y-6 p-6">
                    <div className="flex justify-center mb-4">
                        <div
                            className="w-32 h-32 rounded-full border-4 border-[#1976D2] overflow-hidden cursor-pointer"
                            onClick={handleImageClick}
                        >
                            <img src={preview} alt="Foto de perfil" className="w-full h-full object-cover" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFotoChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#FB8C00]">Editar Información</h2>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                disabled={!editando}
                                className="text-sm bg-white border-[#FB8C00] px-4 py-2 rounded-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!editando}
                                className="text-sm bg-white border-[#FB8C00] px-4 py-2 rounded-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="contraseña">Contraseña</Label>
                            <Input
                                id="contraseña"
                                name="contraseña"
                                type="password"
                                value={formData.contraseña}
                                onChange={handleChange}
                                disabled={!editando}
                                className="text-sm bg-white border-[#FB8C00] px-4 py-2 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={editando ? guardarCambios : () => setEditando(true)}
                            className="w-full bg-[#FB8C00] hover:bg-[#FFA726] text-black"
                        >
                            {editando ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                            {editando ? 'Guardar' : 'Editar'}
                        </Button>
                    </div>

                    <div className="flex justify-center mt-4">
                    <Link href="/dashboard/inicio" passHref>
                        <Button variant="ghost" className="w-full text-[#FB8C00] mt-2" asChild>
                            <span>← Volver al inicio</span>
                        </Button>
                    </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
