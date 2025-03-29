'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md bg-white">
                <CardContent className="space-y-4 p-6">
                    <h2 className="text-2xl font-bold text-center text-[#FB8C00]">Crear cuenta</h2>

                    <div>
                        <Label>Nombre completo</Label>
                        <Input
                            placeholder="Juan Pérez"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>Contraseña</Label>
                        <Input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>Confirmar contraseña</Label>
                        <Input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                    </div>

                    <Button className="w-full bg-[#FDD835] hover:bg-[#FFA726] text-black border-none">
                        Registrarse
                    </Button>


                    <Link href="/" passHref>
                        <Button variant="ghost" className="w-full text-[#FB8C00] mt-2" asChild>
                            <span>← Volver al inicio</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
