const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function createRequest(payload) {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create request');
  }

  return response.json();
}
