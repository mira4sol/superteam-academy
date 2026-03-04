import {
  Courses,
  LessonContents,
  Lessons,
  Media,
  Modules,
  Reviews,
  Streaks,
  Users,
} from '@/collections'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    Users,
    Courses,
    Modules,
    Lessons,
    LessonContents,
    Reviews,
    Streaks,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-prod',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  admin: {
    user: Users.slug,
  },
})
