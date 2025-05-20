import { verifyToken } from "../utils/auth.js"


export function authenticate(req, res, next) {

    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Token de acesso não fornecido! "
        })
    }
    try {
        const decoded = verifyToken(token)

        req.user = decoded
        next()

    } catch (error) {
        return res.status(403).json({
            message: "Token Invalido ou expirado! "
        })
    }
}