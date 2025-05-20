import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { registerUserSchema } from '../validators/userValidator.js'

const prisma = new PrismaClient()

export async function registerUser(req, res) {
  const parsed = registerUserSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error)

  const { name, email, phone, password } = parsed.data
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword },
    })
    res.status(201).json(user)
  } catch {
    res.status(500).json({ error: 'Erro ao registrar usuário' })
  }
}