'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { PlayCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#FB8C00]"
      >
        PetPulse: Cuida, rastrea y alimenta a tu mascota automáticamente
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-center max-w-2xl mb-8 text-[#333333]"
      >
        Una app inteligente que monitoriza la salud de tu mascota con sensores de pulso y GPS, y automatiza su alimentación y agua. Ideal para perros y gatos modernos.
      </motion.p>

      <div className="flex gap-4 mb-12">
        <Link href="/login">
          <Button className="text-lg px-6 py-3 bg-[#FDD835] hover:bg-[#FFA726] text-black border-none">Iniciar sesión</Button>
        </Link>
        <Link href="/register">
        <Button variant="outline" className="text-lg px-6 py-3 border-[#FB8C00] text-[#FB8C00] hover:bg-[#FB8C00] hover:text-white">Regístrate
        </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl"
      >
        <Card className="p-4 bg-white">
          <CardContent className="text-center">
            <img src="/images/pet_sensor.png" alt="Sensor de mascota" className="mx-auto mb-4 h-32" />
            <p>Sensor de pulso y GPS en el collar</p>
          </CardContent>
        </Card>

        <Card className="p-4 bg-white">
          <CardContent className="text-center">
            <img src="/images/auto_feeder.png" alt="Contenedor inteligente" className="mx-auto mb-4 h-32" />
            <p>Contenedor inteligente de comida y agua</p>
          </CardContent>
        </Card>

        <Card className="p-4 bg-white">
          <CardContent className="text-center">
            <img src="/images/mascota_feliz.png" alt="Mascota feliz" className="mx-auto mb-4 h-32" />
            <p>Mascota feliz, saludable y bien cuidada</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 flex items-center gap-2 text-[#FB8C00] hover:underline text-lg"
      >
        <PlayCircle className="w-6 h-6" /> Ver demo rápida
      </motion.button>
    </div>
  )
}
