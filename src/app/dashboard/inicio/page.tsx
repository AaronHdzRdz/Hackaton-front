
import MapaUbicacion from './../../../components/inicio/MapaUbicacion';
import InicioResumen from './../../../components/inicio/InicioResumen';
export const data = {
    resumen: {
        pulsoActual: "102 BPM",                // 🧠 Pulso de la mascota
        nivelActividad: "Alto",                // Nivel de actividad (Alto, Moderado, Bajo)
        alimentoEnPlato: "10g",              // Comida sugerida en gramos
        ultimoAlimento: "hace 1 hora",         // Última vez que comió
        estadoGeneral: "alerta",                // bueno | alerta | peligro
    },
    historial: {
        pulsoDiario: [92, 95, 98, 101, 100, 102, 97],
        alimentoDiario: [110, 115, 130, 125, 140, 135, 120],
        actividadDiaria: [40, 55, 60, 70, 65, 80, 75],
        alertas: [
            { tipo: "pulso", mensaje: "Pulso elevado", hora: "08:43 AM" },
            { tipo: "actividad", mensaje: "Baja actividad", hora: "Ayer" },
        ]
    },
    ubicacion: {
        coordenadas: [
          { lat: 20.60837611460899, lng: -100.41678686832715 },
          { lat: 20.59176907871176, lng: -100.4353404154362 },
          { lat: 20.60176860227005, lng: -100.4138507851146 },
          { lat: 20.610481102608496, lng: -100.43396607861332 }
        ]
      }
}


export default function DefaultInicioView() {
    return (
        <div className="text-[#333] space-y-8">
            <InicioResumen {...data.resumen} />
            <MapaUbicacion {...data.ubicacion} />
        </div>
    );
}