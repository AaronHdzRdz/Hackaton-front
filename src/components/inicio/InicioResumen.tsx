import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { CheckCircle, XCircle } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

interface ResumenProps {
    pulsoActual: string;
    nivelActividad: string;
    alimentoEnPlato: number;
    ultimoAlimento: string;
    estadoGeneral: 'bueno' | 'alerta' | 'peligro';
}

export default function InicioResumen({
    pulsoActual,
    nivelActividad,
    alimentoEnPlato,
    ultimoAlimento,
    estadoGeneral,
}: ResumenProps) {
    const pulsoValue = parseInt(pulsoActual.replace(/\D/g, '')) || 0;
    const actividadValue = nivelActividad.toLowerCase() === 'alto' ? 90 : nivelActividad.toLowerCase() === 'moderado' ? 60 : 30;

    const scatterOptions = {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Tiempo (h)' } },
            y: { title: { display: true, text: 'Nivel de actividad' }, min: 0, max: 100 },
        },
    };

    const scatterData = {
        datasets: [
            {
                label: 'Actividad física',
                data: [
                    { x: 1, y: actividadValue - 10 },
                    { x: 2, y: actividadValue },
                    { x: 3, y: actividadValue + 5 },
                ],
                backgroundColor: '#FB8C00',
            },
        ],
    };

    const haComido = alimentoEnPlato > 0;
    const Icono = haComido ? CheckCircle : XCircle;
    const iconColor = haComido ? 'text-green-500' : 'text-red-500';
    const textoComida = haComido ? 'Ya comió' : 'No ha comido';

    const estadoTexto = estadoGeneral === 'bueno'
        ? 'Comportamiento de tu mascota DENTRO de lo HABITUAL'
        : 'Comportamiento de tu mascota FUERA de lo HABITUAL';

    const estadoColor = estadoGeneral === 'bueno' ? 'bg-green-500' : 'bg-red-500';

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">📊 Resumen en tiempo real</h2>

            <div className={`mb-4 p-4 rounded shadow text-white ${estadoColor}`}>
                {estadoTexto}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center text-center min-h-[200px]">
                    <p className="text-6xl font-bold text-[#FB8C00]">{pulsoValue}</p>
                    <p className="text-3xl font-semibold text-[#666]">BPM</p>
                    <p className="mt-2 text-base font-medium">Pulso actual</p>
                </div>

                <div className="bg-white p-4 rounded shadow flex flex-col items-start justify-start">
                    <p className="mb-2 font-medium">Nivel de actividad</p>
                    <Scatter data={scatterData} options={scatterOptions} />
                </div>

                <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center text-center min-h-[200px]">
                    <Icono className={`w-16 h-16 ${iconColor}`} />
                    <p className="text-xl font-medium mt-2">{textoComida}</p>
                </div>

                <div className="bg-white p-4 rounded shadow flex flex-col items-start justify-start">
                    <button className="bg-[#FB8C00] text-white py-2 px-4 rounded hover:bg-[#FFA726]">Dispensar alimento</button>
                    <p className="text-sm text-gray-600 mt-2">Último alimento dispensado: {ultimoAlimento}</p>
                </div>
            </div>
        </section>
    );
}
