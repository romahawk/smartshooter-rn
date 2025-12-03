// app/api/api.ts
// API helper + types for training sessions

export interface ApiSession {
  id: number;
  title: string;          // e.g. "Spot Shooting"
  accuracy: number;       // 0–100 %
  lastSessionDate: string;
  notes: string;
}

// якщо тестуєш у браузері: http://localhost:4000
// якщо тестуєш на телефоні через Expo — встав свою IP: http://192.168.X.Y:4000
const API_BASE_URL = 'http://localhost:4000';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ===== GET /sessions =====
export async function fetchSessions(): Promise<ApiSession[]> {
  const res = await fetch(`${API_BASE_URL}/sessions`);
  return handleResponse<ApiSession[]>(res);
}

// ===== POST /sessions =====
export type CreateSessionInput = Omit<ApiSession, 'id'>;

export async function createSession(
  data: CreateSessionInput
): Promise<ApiSession> {
  const res = await fetch(`${API_BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<ApiSession>(res);
}

// ===== PUT /sessions/:id =====
export async function updateSessionApi(
  session: ApiSession
): Promise<ApiSession> {
  const res = await fetch(`${API_BASE_URL}/sessions/${session.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session),
  });
  return handleResponse<ApiSession>(res);
}

// ===== DELETE /sessions/:id =====
export async function deleteSessionApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/sessions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
}
