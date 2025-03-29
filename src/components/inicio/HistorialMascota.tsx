interface HistorialProps {
    pulso: {
        promedioDiario: string;
        promedioSemanal: string;
    };
    alimentosConsumidos: { dia: string; cantidad: string }[];
    actividad: {
        promedioDiario: string;
        promedioSemanal: string;
    };
    alertas: { mensaje: string; hora: string }[];
}

export default function HistorialMascota({
    pulso,
    alimentosConsumidos,
    actividad,
    alertas,
}: HistorialProps) {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">📈 Historial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pulso promedio */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-2 font-medium">Promedio de pulsaciones</p>
                    <ul className="text-sm list-disc list-inside">
                        <li>Hoy: {pulso.promedioDiario}</li>
                        <li>Semanal: {pulso.promedioSemanal}</li>
                    </ul>
                </div>

                {/* Registro de alimentos consumidos */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-2 font-medium">Registro de alimentos consumidos</p>
                    <ul className="text-sm list-disc list-inside">
                        {alimentosConsumidos.map((alimento, index) => (
                            <li key={index}>
                                {alimento.dia}: {alimento.cantidad}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actividad promedio */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-2 font-medium">Promedio de actividad</p>
                    <ul className="text-sm list-disc list-inside">
                        <li>Hoy: {actividad.promedioDiario}</li>
                        <li>Semanal: {actividad.promedioSemanal}</li>
                    </ul>
                </div>

                {/* Alertas de salud */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-2 font-medium">Alertas de salud</p>
                    <ul className="text-sm list-disc list-inside text-red-600">
                        {alertas.map((alerta, index) => (
                            <li key={index}>
                                {alerta.mensaje} - {alerta.hora}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}