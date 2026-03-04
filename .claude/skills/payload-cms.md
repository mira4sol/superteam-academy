---
name: payload-cms
description: >
  Best practices for building Next.js apps with Payload CMS and Postgres.
  Use this skill whenever the user is working with Payload CMS, creating
  collections, writing services, querying data, setting up access control,
  or structuring a Payload + Next.js project. Trigger for any mention of
  Payload, payload.find(), payload.create(), collection configs, Local API,
  or REST API in a Next.js context. Also trigger when the user asks about
  folder structure, where to put business logic, or how to query data in
  a Payload app.
---

# Payload CMS — Best Practices & Project Structure

## Project Structure

```
src/
├── app/                          # Next.js app router
│   ├── (frontend)/               # Public-facing routes
│   │   ├── posts/
│   │   │   ├── page.tsx          # Server Component — calls service directly
│   │   │   └── actions.ts        # Server Actions — mutations + revalidate
│   │   └── layout.tsx
│   ├── (payload)/                # Payload admin UI (auto-generated)
│   │   └── admin/
│   └── api/                      # Only for client-side REST consumption
│
├── collections/                  # Payload collection configs ONLY
│   ├── Posts.ts
│   ├── Users.ts
│   └── index.ts                  # Barrel export
│
├── services/                     # Business logic per collection
│   ├── posts.service.ts
│   ├── users.service.ts
│   └── index.ts
│
├── libs/                         # Shared infrastructure
│   ├── payload.ts                # Payload client singleton
│   ├── api/                      # Client-side REST API layer
│   │   ├── index.ts              # Shared fetcher + barrel export
│   │   ├── posts.api.ts
│   │   └── users.api.ts
│   ├── analytics.ts              # GA4 + PostHog unified helper
│   └── sentry.ts                 # Error capture helper
│
├── hooks/                        # Payload hooks (beforeChange, afterRead etc)
│   └── posts.hooks.ts
│
├── access/                       # Reusable access control functions
│   └── isAdmin.ts
│
├── payload.config.ts             # Root Payload config
└── payload-types.ts              # Auto-generated — never edit manually
```

---

## Core Rules

### 1. Collections — schema & config ONLY

Collections must never contain business logic. They define fields, hooks references, and access control references only.

```ts
// ✅ collections/Posts.ts
import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { beforeChangeHook } from '@/hooks/posts.hooks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'richText' },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
```

```ts
// ✅ collections/index.ts
export { Posts } from './Posts'
export { Users } from './Users'
```

---

### 2. Services — all data access & business logic

Every collection gets a corresponding service file. No `payload.find()` calls anywhere outside of services.

```ts
// ✅ services/posts.service.ts
import type { Post } from '@/payload-types'
import { getPayloadClient } from '@/libs/payload'

export async function getPublishedPosts(limit = 10) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit,
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function createPost(data: Partial<Post>) {
  const payload = await getPayloadClient()
  return payload.create({ collection: 'posts', data })
}

export async function updatePost(id: string, data: Partial<Post>) {
  const payload = await getPayloadClient()
  return payload.update({ collection: 'posts', id, data })
}

export async function deletePost(id: string) {
  const payload = await getPayloadClient()
  return payload.delete({ collection: 'posts', id })
}
```

---

### 3. Payload client singleton

Always use a singleton to avoid creating multiple Payload instances.

```ts
// ✅ libs/payload.ts
import { getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}
```

---

### 4. Local API vs REST API

| Context           | Use                              |
| ----------------- | -------------------------------- |
| Server Components | Local API via service            |
| Server Actions    | Local API via service            |
| Client Components | REST API (`fetch('/api/posts')`) |
| External / mobile | REST API                         |

**Never** call `fetch('http://localhost:3000/api/...')` inside Server Components — use the Local API instead.

```ts
// ✅ Server Component — use service (Local API)
import { getPublishedPosts } from '@/services/posts.service'

export default async function PostsPage() {
  const { docs } = await getPublishedPosts()
  return <PostList posts={docs} />
}
```

```ts
// ✅ Client Component — use libs/api.ts + React Query
'use client'
import { useQuery } from '@tanstack/react-query'
import { postsAPI } from '@/libs/api'

export function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'published'],
    queryFn: () => postsAPI.find('where[status][equals]=published'),
  })

  if (isLoading) return <p>Loading...</p>
  return <ul>{data?.docs.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
```

---

### 5. Server Actions — mutations with cache revalidation

```ts
// ✅ app/(frontend)/posts/actions.ts
'use server'
import { revalidatePath } from 'next/cache'
import { createPost, updatePost } from '@/services/posts.service'
import type { Post } from '@/payload-types'

export async function createPostAction(data: Partial<Post>) {
  const post = await createPost(data)
  revalidatePath('/posts')
  return post
}

export async function publishPostAction(id: string) {
  await updatePost(id, {
    status: 'published',
    publishedAt: new Date().toISOString(),
  })
  revalidatePath('/posts')
  revalidatePath(`/posts/${id}`)
}
```

---

### 6. Types — use auto-generated payload-types.ts

Enable type generation in `payload.config.ts` and never write manual types for collections:

```ts
// payload.config.ts
import { buildConfig } from 'payload'
import path from 'path'
import { Posts, Users } from '@/collections'

export default buildConfig({
  collections: [Posts, Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
```

```ts
// ✅ Use generated types everywhere
import type { Post, User } from '@/payload-types'
```

Run `npx payload generate:types` after changing collection fields.

---

### 7. Postgres with Payload

```ts
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
})
```

Run migrations after every collection field change:

```bash
npx payload migrate:create   # generate migration file
npx payload migrate          # apply migrations
```

**Postgres best practices with Payload:**

Index fields used in `where` queries:

```ts
{ name: 'slug', type: 'text', unique: true, index: true }
{ name: 'status', type: 'select', index: true }
```

Use `depth` to control relationship joins and avoid over-fetching:

```ts
// Only join 1 level deep (default is 2)
const { docs } = await payload.find({ collection: 'posts', depth: 1 })

// No joins — raw IDs only, fastest
const { docs } = await payload.find({ collection: 'posts', depth: 0 })
```

Use `select` to fetch only needed columns:

```ts
const { docs } = await payload.find({
  collection: 'posts',
  select: { title: true, slug: true, publishedAt: true },
})
```

---

### 8. Access Control

Keep access control functions in `/access` and reuse them across collections:

```ts
// ✅ access/isAdmin.ts
import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return { id: { equals: user?.id } }
}
```

---

### 9. Hooks — keep in /hooks

```ts
// ✅ hooks/posts.hooks.ts
import type { BeforeChangeHook } from 'payload/types'

export const beforeChangeHook: BeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create') {
    data.slug = data.title?.toLowerCase().replace(/\s+/g, '-')
  }
  return data
}
```

---

### 10. Client-side API layer — libs/api/

All client-side REST calls go through `libs/api/`. This is the client equivalent of the service layer — never call `fetch('/api/...')` directly in components. Split by collection so files stay small and focused.

```ts
// libs/api/index.ts — shared fetcher + barrel export
export async function fetchAPI<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export { postsAPI } from './posts.api'
export { usersAPI } from './users.api'
```

```ts
// libs/api/posts.api.ts
import { fetchAPI } from './index'
import type { Post } from '@/payload-types'

export const postsAPI = {
  find: (params?: string) =>
    fetchAPI<{ docs: Post[] }>(`/posts${params ? `?${params}` : ''}`),

  findOne: (id: string) => fetchAPI<Post>(`/posts/${id}`),

  create: (data: Partial<Post>) =>
    fetchAPI<Post>('/posts', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: Partial<Post>) =>
    fetchAPI<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) => fetchAPI(`/posts/${id}`, { method: 'DELETE' }),
}
```

```ts
// Usage in components — import path stays clean
import { postsAPI } from '@/libs/api'
```

### 11. React Query — standard for all client data fetching

Use React Query for all client-side reads and mutations. Never use raw `useEffect` + `useState` for data fetching.

```bash
npm install @tanstack/react-query
```

```tsx
// app/providers.tsx — wrap app in QueryClientProvider
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Reads with useQuery:**

```ts
'use client'
import { useQuery } from '@tanstack/react-query'
import { postsAPI } from '@/libs/api'

export function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', 'published'],
    queryFn: () => postsAPI.find('where[status][equals]=published'),
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading posts</p>
  return <ul>{data?.docs.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
```

**Mutations with useMutation:**

```ts
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsAPI } from '@/libs/api'

export function CreatePostForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: unknown) => postsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <button
      onClick={() => mutation.mutate({ title: 'New Post', status: 'draft' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Creating...' : 'Create Post'}
    </button>
  )
}
```

---

## Mental Model Summary

```
payload-types.ts        → auto-generated types, never touch
collections/*.ts        → schema, fields, access refs, hook refs ONLY
services/*.service.ts   → all payload.find/create/update/delete calls
libs/payload.ts          → singleton client
hooks/*.hooks.ts        → beforeChange, afterRead, etc.
access/*.ts             → reusable access control functions
app/**/page.tsx         → Server Components, call services directly
app/**/actions.ts       → Server Actions, call services + revalidate
libs/api/index.ts       → shared fetcher + barrel export
libs/api/*.api.ts       → client-side REST calls, one file per collection
app/**/components       → Client Components, use libs/api.ts + React Query
```

**Two rules to remember:**

- Server-side: always go through a service (`services/*.service.ts`) using the Local API
- Client-side: always go through `libs/api.ts` using React Query — never raw `useEffect` fetches, never `payload.find()`
