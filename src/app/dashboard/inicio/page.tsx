'use client';

import dynamic from 'next/dynamic';
import InicioResumen from './../../../components/inicio/InicioResumen';

// ⛔️ ADIÓS IMPORT DIRECTO
// import MapaUbicacion from './../../../components/inicio/MapaUbicacion';

// ✅ IMPORT DINÁMICO SIN SSR
const MapaUbicacion = dynamic(() => import('./../../../components/inicio/MapaUbicacion'), {
  ssr: false,
});

export const data = {
  resumen: {
    pulsoActual: '102 BPM',
    nivelActividad: 'Alto',
    alimentoEnPlato: '10g',
    ultimoAlimento: 'hace 1 hora',
    estadoGeneral: 'bueno',
  },
  historial: {
    pulsoDiario: [92, 95, 98, 101, 100, 102, 97],
    alimentoDiario: [110, 115, 130, 125, 140, 135, 120],
    actividadDiaria: [40, 55, 60, 70, 65, 80, 75],
    alertas: [
      { tipo: 'pulso', mensaje: 'Pulso elevado', hora: '08:43 AM' },
      { tipo: 'actividad', mensaje: 'Baja actividad', hora: 'Ayer' },
    ],
  },
};

export const dataMascotas = [
  {
    nombre: 'Luna',
    tipo: 'perro',
    coordenadas: [
      { lat: 20.70414212867943, lng: -100.44420397156584 },
      { lat: 20.704174745517527, lng: -100.444194583834942 },
      { lat: 20.704212380322, lng: -100.44411948198771 },
      { lat: 20.704138365197664, lng: -100.4436621653824 },
    ],
  },
  {
    nombre: 'Milo',
    tipo: 'gato',
    coordenadas: [
      { lat: 20.704490621576465, lng: -100.44370291722056 },
      { lat: 20.704617325116946, lng: -100.443484317201 },
      { lat: 20.704695515147826, lng: -100.44333498666964 },
      { lat: 20.70447096139171, lng: -100.44340874741243 },
    ],
  },
  {
    nombre: 'Max',
    tipo: 'perro',
    coordenadas: [
      { lat: 20.704294078024088, lng: -100.44352542349341 },
      { lat: 20.704251425267973, lng: -100.44328134248998 },
      { lat: 20.704294078024088, lng: -100.44327731917674 },
      { lat: 20.70423009888541, lng: -100.44328134248998 },
    ],
  },
  {
    nombre: 'Nala',
    tipo: 'gato',
    coordenadas: [
      { lat: 20.70467167985101, lng: -100.44420134016073 },
      { lat: 20.70471182351053, lng: -100.44407527634579 },
      { lat: 20.704751967159396, lng: -100.44394518921759 },
      { lat: 20.704800892217097, lng: -100.44380303214966 },
    ],
  },
  {
    nombre: 'Rocky',
    tipo: 'perro',
    coordenadas: [
      { lat: 20.704795933684547, lng: -100.44329368661597 },
      { lat: 20.704823978285376, lng: -100.44323518722538 },
      { lat: 20.704819190183173, lng: -100.44320740001487 },
      { lat: 20.704771993167558, lng: -100.44318034404671 },
    ],
  },
];

export default function DefaultInicioView() {
  return (
    <div className="text-[#333] space-y-8">
      <InicioResumen {...data.resumen} />
      <MapaUbicacion mascotas={dataMascotas} />
    </div>
  );
}
