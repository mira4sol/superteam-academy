import { fetchAPI } from './index'

export const streaksAPI = {
  get: (userId: string) =>
    fetchAPI<{ docs: unknown[] }>(
      `/streaks?where[user][equals]=${userId}&limit=1`,
    ),

  recordActivity: (userId: string) =>
    fetchAPI<unknown>(`/streaks`, {
      method: 'POST',
      body: JSON.stringify({ user: userId }),
    }),
}
