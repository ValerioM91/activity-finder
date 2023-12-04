import { PrismaClient } from "@prisma/client"

const PrismaClientSingleton = () => {
  const prisma = new PrismaClient()
  return prisma
}

type PrismaClientSingleton = ReturnType<typeof PrismaClientSingleton>

const globalPrisma = globalThis as unknown as { prisma?: PrismaClientSingleton }

const prisma = globalPrisma.prisma ?? PrismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma
