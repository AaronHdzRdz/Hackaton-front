const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getChat(message) {
  const res = await fetch(`${API_URL}/api/gemini/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.response;
}
