import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { loginSchema } from '../schemas/loginSchema.js'

const prisma = new PrismaClient()

export async function login(req, res) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
         where: { 
            email } 
        }) ||
        await prisma.admin.findUnique({ 
            where: { 
                email } 
            })

    if (!user) return res.status(404).json({ 
        message: 'Usuário não encontrado' })

    const validate = await bcrypt.compare(password, user.password)
    if (!validate) return res.status(401).json({ 
        message: 'Senha incorreta' })

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },
        'secret', { expiresIn: '1h' })
    res.json({ token })
}