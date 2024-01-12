const User = require('../models/User')
const yup = require('yup')


module.exports = {
    async store(req, res) {
        
        const Schema = yup.object().shape({
            email: yup.string().email().required(),
            senha: yup.string().required().min(6),
        })

        if (!(await Schema.isValid(req.body))){
            return res.status(400).json({error: "email ou senha estão incorreto"})
        }

        const { email,senha } = req.body

        const user = await User.findOne({
            where: { email }
        })

        if(!user){
            return res.status(400).json({error: "email ou senha estão incorreto"})
        }

        const validSenha = await user.checkerSenha(senha)

        if(!validSenha){
            return res.status(400).json({error: "email ou senha estão incorreto"})
        }

        return res.status(200).json({
                id: user.id, 
                nome: user.nome,
                email: user.email,
                admin: user.admin,
            })
    
    }
}