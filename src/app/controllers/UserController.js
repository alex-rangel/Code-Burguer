const User = require('../models/User')
const yup = require('yup')
const { v4: uuidV4 } = require('uuid')

module.exports = {
    async store(req, res) {
        
        const Schema = yup.object().shape({
            nome: yup.string().required(),
            email: yup.string().email().required(),
            presenha: yup.string().required().min(6),
        })

        if (!(await Schema.isValid(req.body))){
            return res.status(400).json({error: "dados informados estao invalidos"})
        }

        const {nome, email, presenha, admin} = req.body

        const user = await User.findOne({
            where: { email }
        })

        if(user){
           return res.status(400).json({error:"O email informado ja existe"})
        }

        const newUser = await User.create({
            id:uuidV4(),
            nome,
            email,
            presenha,
            admin,
        })

        return res.status(200).json({
                id: newUser.id, 
                nome,
                email,
                admin,
            })
    
    }
}