import { useState } from 'react';
import { Bell, BellOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Notificacion {
  mensaje: string;
  leido: boolean;
  hora: string;
}

interface Props {
  notificaciones: Notificacion[];
  onAtender?: (index: number) => void;
}

export default function Notificaciones({ notificaciones, onAtender }: Props) {
  const [abierto, setAbierto] = useState(false);
  const tieneNoLeidas = notificaciones.some(n => !n.leido);

  return (
    <Popover open={abierto} onOpenChange={setAbierto}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          {tieneNoLeidas ? <Bell className="text-yellow-500" /> : <BellOff className="text-gray-400" />}
          {tieneNoLeidas && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-ping" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white shadow-xl border rounded p-4 space-y-3">
        <h3 className="text-lg font-semibold">Notificaciones</h3>
        {notificaciones.length === 0 ? (
          <p className="text-sm text-gray-500">No tienes notificaciones.</p>
        ) : (
          <ul className="space-y-3">
            {notificaciones.map((n, i) => (
              <li
                key={i}
                className={`text-sm p-2 rounded border flex flex-col gap-1 ${n.leido ? 'bg-gray-100' : 'bg-yellow-100 border-yellow-400'}`}
              >
                <div className="font-medium">{n.mensaje}</div>
                <div className="text-xs text-gray-500">{n.hora}</div>
                {!n.leido && onAtender && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAtender(i)}
                    className="flex items-center gap-1 w-fit text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4" /> Marcar como atendido
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
