
// Requisição -> Middleware -> Rota( Controllers ) -> Resposta

// function middleware (req, res, next) {
//     // 1. Fazer algo com a requisiçãao 
//     // -> Validar as informações
//     // -> Verificar se o usr tem conta
//     // 2. Modificar a resposta
//     // -> Dar uma resposta ao cliente  
//     // 3. Chamar o next() para passar para o proximo middleware(agente)
//     // Ou encerrar com res.send()

// }


export function validate(schema) {
    return (req, res, next) => {
        try {
            /* Validar o corpo da requisição contra o schema fornecido */
            const validatedData = schema.parse(req.body)
            /* Substituir o bory por os dadas validados*/
            req.body = validatedData
            /* Chamar meu proximo agente(middleware)*/
            next()
        } catch (error) {
            return res.status(400).json({
                message: "erro de validação ",
                erros: error.errors.map(e => ({
                    path: e.path,
                    message: e.message
                }))
            })
        }

    }
}