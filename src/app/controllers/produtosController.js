const Produto = require('../models/Produtos')
const yup = require('yup')

module.exports = {
    async store(req, res) {
        
        const Schema = yup.object().shape({
            nome: yup.string().required("A informação do nome é obrigatorio"),
            preco: yup.number().required(),
            categoria_id: yup.number().required(),
        })

        try{
        await Schema.validateSync(req.body, {abortEarly: false})
        }catch(err){
            return res.status(400).json({errado: err.message})
        }

        const {filename: imagem} = req.file
        const {nome, preco, categoria_id} = req.body
        
        const newProduto = await Produto.create({
            nome,
            preco,
            categoria_id,
            imagem,
        })
        
        res.status(200).json(newProduto)
    },

    async index(req, res) {

        console.log(process.env.DB_USERNAME)
       
        const produtos = await Produto.findAll({
            include: {
                association: 'categoria',
                attributes: ['nome']
            }
        })

        return res.status(200).json(produtos)

    }

      
}