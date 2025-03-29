'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { PawPrint, PlusCircle, LayoutDashboard, User, BarChart2, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import DefaultInicioView from "./inicio/page"
import Script from "next/script"
import ChatIA from './../../components/chat/chat';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const [pathname, setPathname] = useState<string | null>(null)
    const currentPath = usePathname()

    useEffect(() => {
        setPathname(currentPath)
    }, [currentPath])

    const menuItems = [
        { href: "/dashboard/inicio", label: "Inicio", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/dashboard/mascotas", label: "Mis Mascotas", icon: <PawPrint className="w-5 h-5" /> },
        { href: "/dashboard/mascotas/nueva", label: "Registrar Mascota", icon: <PlusCircle className="w-5 h-5" /> },
        { href: "/dashboard/mascotas/eliminar", label: "Eliminar Mascota", icon: <PlusCircle className="w-5 h-5" /> },
        { href: "/dashboard/historial", label: "Historial", icon: <BarChart2 className="w-5 h-5" /> }
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
                            <p className="font-semibold text-[#FB8C00]">John Doe</p>
                            <p className="text-sm text-[#333]">johndoe@email.com</p>
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname === "/dashboard" || pathname === "/dashboard/inicio"

    return (
        <div className="flex min-h-screen bg-[#F2F2F2]">
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpjUDL33CJl-jRrV6v58RDxxVVQU1zfL4&libraries=places`}
              strategy="beforeInteractive"
            />
            
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
            <ChatIA />
        </div>
    )
}