'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface UbicacionProps {
    coordenadas: { lat: number; lng: number }[];
}

// Componente auxiliar para centrar el mapa en toda la ruta
function CentrarMapa({ coordenadas }: UbicacionProps) {
    const map = useMap();
    useEffect(() => {
        if (coordenadas.length > 1) {
            const bounds = L.latLngBounds(coordenadas.map(coord => [coord.lat, coord.lng]));
            map.fitBounds(bounds, { padding: [20, 20] });
        } else if (coordenadas.length === 1) {
            map.setView(coordenadas[0], 15);
        }
    }, [coordenadas, map]);
    return null;
}

export default function MapaUbicacion({ coordenadas }: UbicacionProps) {
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const leaflet = await import('leaflet');
            setL(leaflet);
        })();
    }, []);

    if (!L) return null;

    const iconoPerrito = L.divIcon({
        html: '🐶',
        className: 'text-3xl',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">📍 Ubicación</h2>
            <div className="w-full h-96 rounded shadow overflow-hidden">
                <MapContainer
                    center={coordenadas[0] || { lat: 0, lng: 0 }}
                    zoom={14}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {coordenadas.length > 1 && <Polyline positions={coordenadas} color="#1976D2" />}

                    {coordenadas.length > 0 && (
                        <Marker position={coordenadas[coordenadas.length - 1]} icon={iconoPerrito}>
                            <Popup>Última ubicación del perrito 🐾</Popup>
                        </Marker>
                    )}

                    <CentrarMapa coordenadas={coordenadas} />
                </MapContainer>
            </div>
        </section>
    );
}
