// app/api/api.ts
// API helper + types for training sessions

export interface ApiSession {
  id: number;
  title: string;          // e.g. "Spot Shooting"
  accuracy: number;       // 0–100 %
  lastSessionDate: string;
  notes: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchSessions(): Promise<ApiSession[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch sessions from API');
  }

  const posts: { id: number; title: string; body: string }[] =
    await response.json();

  // Take first 8 posts and map them into our domain model
  const sessions: ApiSession[] = posts.slice(0, 8).map((post, index) => {
    const accuracy = 60 + ((index * 3) % 20); // 60–79% just to have different values
    const lastSessionDate = `API session #${post.id}`;

    return {
      id: post.id,
      title: post.title,
      accuracy,
      lastSessionDate,
      notes: post.body,
    };
  });

  return sessions;
}
