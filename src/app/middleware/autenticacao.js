const jwt = require('jsonwebtoken')

module.exports = {

    autenticacao(req, res, next) {

        const auttoken = req.headers.authorization

        if(!auttoken){
            return res.status(401).json({error: "O envio do token é obrigtorio"})
        }

        const token = auttoken.split(" ")[1]
        
        try{
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {

            if(err) {
                throw new Error()
            }

            req.Userid = decoded.id
            req.Username = decoded.nome
            

            return next()
        })
    }catch(err){
        return res.status(401).json({error: "token invalido"})
    }
    }
}