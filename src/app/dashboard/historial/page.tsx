import HistorialMascota from './../../../components/inicio/HistorialMascota';

export const data = {
    historial: {
        pulso: {
            promedioDiario: "80 bpm",
            promedioSemanal: "75 bpm",
        },
        alimentosConsumidos: [
            { dia: "Hoy", cantidad: "120g" },
            { dia: "Ayer", cantidad: "100g" },
        ],
        actividad: {
            promedioDiario: "2 horas",
            promedioSemanal: "10 horas",
        },
        alertas: [
            { mensaje: "Pulso elevado", hora: "09:12 AM" },
            { mensaje: "Baja actividad", hora: "Ayer" },
        ],
    },
};

export default function DefaultHistorialView() {
    return (
        <HistorialMascota {...data.historial} />
    );
}