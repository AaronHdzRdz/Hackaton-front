'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Coordenada {
  lat: number;
  lng: number;
}

interface MascotaConRuta {
  nombre: string;
  tipo: 'perro' | 'gato';
  coordenadas: Coordenada[];
}

interface Props {
  mascotas: MascotaConRuta[];
}

function CentrarMapa({ mascotas, L }: Props & { L: any }) {
  const map = useMap();

  useEffect(() => {
    if (!L) return;
    const todasLasCoords = mascotas.flatMap(m => m.coordenadas);
    if (todasLasCoords.length > 1) {
      const bounds = L.latLngBounds(todasLasCoords.map(coord => [coord.lat, coord.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (todasLasCoords.length === 1) {
      map.setView(todasLasCoords[0], 15);
    }
  }, [mascotas, map, L]);

  return null;
}

export default function MapaUbicacion({ mascotas }: Props) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then(leaflet => {
        setL(leaflet);
      });
    }
  }, []);

  if (!L) return <p className="text-center">Cargando mapa...</p>;

  const colores = ['#fdd835', '#ffa726', '#fb8c00', '#1976d2'];

  const obtenerIcono = (tipo: 'perro' | 'gato') => L.divIcon({
    html: tipo === 'perro' ? '🐶' : '😸',
    className: 'text-3xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <section className="relative z-10">
      <h2 className="text-2xl font-semibold mb-4">📍 Ubicación</h2>
      <div className="relative w-full h-96 rounded shadow overflow-hidden z-10">
        <MapContainer
          center={mascotas[0]?.coordenadas[0] || { lat: 0, lng: 0 }}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mascotas.map((m, i) => (
            <div key={i}>
              {m.coordenadas.length > 1 && (
                <Polyline
                  positions={m.coordenadas}
                  color={colores[i % colores.length]}
                />
              )}
              {m.coordenadas.length > 0 && (
                <Marker
                  position={m.coordenadas[m.coordenadas.length - 1]}
                  icon={obtenerIcono(m.tipo)}
                >
                  <Popup>
                    Última ubicación de {m.nombre} {m.tipo === 'gato' ? '😸' : '🐶'}
                  </Popup>
                </Marker>
              )}
            </div>
          ))}

          <CentrarMapa mascotas={mascotas} L={L} />
        </MapContainer>
      </div>
    </section>
  );
}
