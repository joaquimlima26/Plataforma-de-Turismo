import bcrypt from 'bcrypt'
import { json } from 'express'
import jwt from 'jsonwebtoken'
const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET


export async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password, hashdPassword) {
    return await bcrypt.compare(password, hashdPassword)
}

export const generateToken = (admin) => {
    return jwt.sign(
        {id: admin.id, email: admin.email},
        JWT_SECRET,
        {expiresIn: "1h"}
        )
}

export function verifyToken(token){
    return jwt.verify(token, JWT_SECRET)
}
