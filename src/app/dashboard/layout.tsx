'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { PawPrint, PlusCircle, LayoutDashboard, Cog, Bell, FlaskConical, User } from "lucide-react"
import { usePathname } from "next/navigation"

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const [pathname, setPathname] = useState<string | null>(null)
    const currentPath = usePathname()

    useEffect(() => {
        setPathname(currentPath)
    }, [currentPath])

    const menuItems = [
        { href: "/inicio", label: "Inicio", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/mascotas", label: "Mis Mascotas", icon: <PawPrint className="w-5 h-5" /> },
        { href: "/mascotas/nueva", label: "Registrar Mascota", icon: <PlusCircle className="w-5 h-5" /> },
        { href: "/contenedor", label: "Contenedor", icon: <Cog className="w-5 h-5" /> },
        { href: "/alertas", label: "Alertas", icon: <Bell className="w-5 h-5" /> },
        { href: "/simulador", label: "Simulación", icon: <FlaskConical className="w-5 h-5" /> }
    ]

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ width: isOpen ? 256 : 64 }}
        >
            <div className="p-4 border-b flex items-center justify-start w-full overflow-hidden">
                <Link href="/perfil" className="w-full">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <User className="w-6 h-6 text-[#FB8C00] min-w-[24px]" />
                        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}>
                            <p className="font-semibold text-[#FB8C00]">Juanito Pérez</p>
                            <p className="text-sm text-[#333]">juanito@email.com</p>
                        </div>
                    </div>
                </Link>
            </div>

            <nav className="mt-4 px-2 space-y-2">
                {menuItems.map(({ href, label, icon }) => {
                    const isActive = pathname === href || (href === "/inicio" && pathname === "/dashboard")
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 py-2 px-3 rounded w-full transition-colors duration-200 ${isActive ? 'bg-[#FDD835] text-black font-semibold' : 'text-[#333] hover:bg-[#FFF8E7]'
                                }`}
                        >
                            <div className="min-w-[24px]">{icon}</div>
                            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}>{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

function DefaultInicioView() {
    return (
        <div className="text-[#333] space-y-8">
            <section>
                <h2 className="text-2xl font-semibold mb-4">📊 Resumen en tiempo real</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">Pulso actual: <strong>98 BPM</strong></div>
                    <div className="bg-white p-4 rounded shadow">Nivel de actividad: <div className="h-24 bg-[#FFF8E7] rounded"></div></div>
                    <div className="bg-white p-4 rounded shadow">Alimento sugerido: <strong>120g</strong></div>
                    <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-2">
                        <button className="bg-[#FB8C00] text-white py-2 px-4 rounded hover:bg-[#FFA726]">Dispensar alimento</button>
                        <p className="text-sm text-gray-600">Último alimento dispensado: hace 2h</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">📍 Ubicación</h2>
                <div className="w-full h-64 bg-gray-200 rounded shadow flex items-center justify-center">
                    <p className="text-sm text-gray-500">[Mapa en tiempo real]</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">📈 Historial</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2 font-medium">Pulso diario/semanal</p>
                        <div className="h-32 bg-[#FFF8E7] rounded" />
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2 font-medium">Registro de alimentos consumidos</p>
                        <ul className="text-sm list-disc list-inside">
                            <li>Hoy: 120g</li>
                            <li>Ayer: 100g</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2 font-medium">Actividad diaria</p>
                        <div className="h-24 bg-[#FFF8E7] rounded" />
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-2 font-medium">Alertas de salud</p>
                        <ul className="text-sm list-disc list-inside text-red-600">
                            <li>Pulso elevado - 09:12 AM</li>
                            <li>Baja actividad - Ayer</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname === "/dashboard" || pathname === "/dashboard/inicio"

    return (
        <div className="flex min-h-screen bg-[#F2F2F2]">
            <Sidebar />

            <div className="ml-[64px] w-[calc(100%-64px)] flex flex-col transition-all duration-300">
                <header className="relative px-4 py-3 bg-white shadow-md flex items-center justify-center">
                    <h1 className="text-lg font-bold text-[#FB8C00] text-center">
                        {isDashboard ? 'Inicio' : 'PetPulse'}
                    </h1>
                </header>

                <main className="p-6">
                    {isDashboard ? <DefaultInicioView /> : children}
                </main>
            </div>
        </div>
    )
}
