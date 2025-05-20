import express from "express"
// import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
const app = express()

//PERMITE QUE O EXPRESS ENTENDA JSON NO CORPO DA REQUISIÇAO
 app.use(express.json())

//DEFINE O ENDPOINT /USER PARA AS ROTAS DE USUARIOS
// app.use("/users", userRoutes)
app.use("/admin", adminRoutes)

export default app