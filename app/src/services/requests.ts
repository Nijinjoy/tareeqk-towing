import { Platform } from 'react-native';

export type TowingRequest = {
  id: number | string;
  customer_name: string;
  location: string;
  note?: string | null;
  status?: string | null;
};

type RequestsResponse = {
  data: TowingRequest[];
};

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000/api'
    : 'http://127.0.0.1:8000/api';

export async function getAssignedRequests(): Promise<TowingRequest[]> {
  const response = await fetch(`${API_BASE_URL}/requests`);

  if (response.status === 204 || response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as RequestsResponse;
  return Array.isArray(data.data) ? data.data : [];
}

export async function assignRequest(requestId: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/requests/${requestId}/assign`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Assign failed: ${response.status}`);
  }
}

export async function deleteRequest(requestId: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
}

export async function validateUserName(
  name: string,
  role: 'driver' | 'customer',
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message =
      typeof error?.message === 'string'
        ? error.message
        : 'Unable to validate name.';
    throw new Error(message);
  }
}
