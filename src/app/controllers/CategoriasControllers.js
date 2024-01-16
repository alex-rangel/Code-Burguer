const Categorias = require('../models/Categorias')
const yup = require('yup')

module.exports = {
    async store(req, res) {
        
        const Schema = yup.object().shape({
            nome: yup.string().required("A informação do nome é obrigatorio"),
        })

        try{
        await Schema.validateSync(req.body, {abortEarly: false})
        }catch(err){
            return res.status(400).json({errado: err.message})
        }

        const { nome } = req.body

        const categoriaExistente = await Categorias.findOne({where: { nome }})
        console.log(categoriaExistente)

        if(categoriaExistente) {
            return res.status(400).json({error: "está categoria já existe"})
        }
        
        const novaCategoria = await Categorias.create({
            nome
        })
        
        res.status(200).json(novaCategoria)
    },

      
}