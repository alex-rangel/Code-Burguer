const Produto = require('../models/Produtos')
const User = require('../models/User')
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

        const id = req.Userid

        const usuario = await User.findByPk(id)

        if(!(usuario.admin)){
            return res.status(400).json({menssage: "Apagina so pode ser acessada por um administrador"})
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

        const id = req.Userid

        const usuario = await User.findByPk(id)

        if(!(usuario.admin)){
            return res.status(400).json({menssage: "Apagina so pode ser acessada por um administrador"})
        }
       
        const produtos = await Produto.findAll({
            include: {
                association: 'categoria',
                attributes: ['nome']
            }
        })

        return res.status(200).json(produtos)

    },

    async update(req, res) {
        const{id} = req.params
        
        const Id = req.Userid

        const usuario = await User.findByPk(Id)

        if(!(usuario.admin)){
            return res.status(400).json({menssage: "Apagina so pode ser acessada por um administrador"})
        }

        let imagem
        if(req.file) {
            let imagem = req.file.filename
        }
        
        const {nome, preco, categoria_id} = req.body

        
        await Produto.update(
            { 
            nome,
            preco,
            categoria_id,
            imagem,
            }, 
            {where: {id}}
        )
        
        return res.status(200).json({menssage: "Produto atualizado com sucesso"})
    }

      
}