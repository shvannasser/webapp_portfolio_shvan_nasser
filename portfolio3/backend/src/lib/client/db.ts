import "dotenv/config"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "../../generated/prisma/client"

// Prisma 7 requires a driver adapter. DATABASE_URL is resolved from the
// directory you run the server from (the backend folder).
const createClient = () =>
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    }),
  })

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// Avoid creating multiple PrismaClient instances in development with hot reloading
const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma
