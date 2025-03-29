'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError("Se requieren credenciales válidas.");
    } else {
      setError('');
      router.push('/dashboard/inicio');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white shadow-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-bold text-center text-[#FB8C00]">Iniciar sesión</h2>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button
            onClick={handleLogin}
            className="w-full bg-[#FDD835] hover:bg-[#FFA726] text-black"
          >
            Entrar
          </Button>

          <p className="text-center text-sm text-gray-500 mt-2">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#FB8C00] hover:underline">
              Regístrate
            </a>
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
  );
}
