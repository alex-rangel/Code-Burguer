const Pedidos = require('../models/Pedidos')
const yup = require('yup')

module.exports = {
    async store(req, res) {
        
        const Schema = yup.object().shape({
            produtos: yup.array().required().of(
               yup.object().shape({
                id: yup.number().required(),
                quantidade: yup.number().required(),
               }) 
            ),
        })

        try{
        await Schema.validateSync(req.body, {abortEarly: false})
        }catch(err){
            return res.status(400).json({errado: err.message})
        }

       const Pedido = {
            user:{
                id: req.Userid,
                nome: req. Usernome
            }
       }
    },

      
}