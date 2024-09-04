'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const testingDoang = async () => {
   const users =  await prisma.user.findMany()
   console.log(users);
   return
   
} 