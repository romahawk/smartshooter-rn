// app/api/api.ts

export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export type ApiSession = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/**
 * Fetches mock "sessions" from JSONPlaceholder.
 * In SmartShooter RN we treat each post as a training session.
 */
export async function fetchSessions(): Promise<ApiSession[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = (await response.json()) as ApiSession[];
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}
