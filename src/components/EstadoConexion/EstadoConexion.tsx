'use client'

import { useEffect, useState } from 'react';

export default function EstadoConexion() {
    const [online, setOnline] = useState(true);

    useEffect(() => {
        const actualizarEstado = () => setOnline(navigator.onLine);

        window.addEventListener('online', actualizarEstado);
        window.addEventListener('offline', actualizarEstado);

        actualizarEstado(); // al iniciar

        return () => {
            window.removeEventListener('online', actualizarEstado);
            window.removeEventListener('offline', actualizarEstado);
        };
    }, []);

    if (online) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-sm text-center py-2 z-[9999]">
            ⚠️ Sin conexión a internet. Algunos datos podrían no mostrarse.
        </div>
    );
}
