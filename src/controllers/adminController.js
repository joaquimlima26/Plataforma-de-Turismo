import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function registerAdmin(req, res) {
    const { name, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        })
        res.status(201).json({
            name: admin.name,
            email: admin.email,
            password: hashedPassword
        })
    } catch(error) {
        res.status(500).json({ 
            messagem: 'Erro ao registrar admin', 
            error: error.message
    })
    }
}