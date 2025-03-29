'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md bg-white shadow-md">
                <CardContent className="space-y-4 p-6">
                    <h2 className="text-2xl font-bold text-center text-[#FB8C00]">Iniciar sesión</h2>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                    </div>

                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" />
                    </div>

                    <Button className="w-full bg-[#FDD835] hover:bg-[#FFA726] text-black">
                        Entrar
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-2">
                        ¿No tienes cuenta? <a href="/register" className="text-[#FB8C00] hover:underline">Regístrate</a>
                    </p>

                    <p className="text-center text-sm text-[#FB8C00] mt-1 hover:underline cursor-pointer">
                        ¿Olvidaste tu contraseña?
                    </p>


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
