import { fetchAPI } from './index'

export const usersAPI = {
  me: () => fetchAPI<unknown>('/users/me'),

  findById: (id: string) => fetchAPI<unknown>(`/users/${id}`),

  update: (id: string, data: Record<string, unknown>) =>
    fetchAPI<unknown>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}
