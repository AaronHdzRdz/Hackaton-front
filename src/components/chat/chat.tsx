// src/components/ChatIA.tsx
'use client';

import { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { getChat } from '../../../api/gemini.js'; // Importa la función de la API

export default function ChatIA() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Función para manejar el envío de los mensajes
  const handleSend = async () => {
    if (!input.trim()) return;  // Si no hay texto, no hace nada

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Llamada a la API para obtener la respuesta de la IA
      const aiResponse = await getChat(input);  // Usamos la función getChat importada

      // Si la respuesta no está vacía, se agrega al chat
      if (aiResponse.trim()) {
        const aiMessage = { role: 'ai', content: aiResponse };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('❌ Error al obtener respuesta de la IA:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para enviar el mensaje al presionar 'Enter'
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-[#FB8C00] hover:bg-[#FFA726] text-white p-3 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-[#FFF8E7] border rounded-lg shadow-lg flex flex-col z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b bg-white">
            <h3 className="font-semibold text-[#FB8C00]">Asistente IA</h3>
            <button onClick={() => setOpen(false)} className="text-[#1976D2] hover:text-[#FFA726]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#FB8C00] text-white self-end ml-auto'
                    : 'bg-white text-[#333] self-start mr-auto border border-[#1976D2]'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-sm text-[#1976D2]">IA está escribiendo...</p>}
          </div>

          <div className="flex items-center gap-2 border-t p-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border rounded focus:outline-none text-[#333]"
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={handleSend}
              className="bg-[#FDD835] hover:bg-[#FFA726] text-black p-2 rounded"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
