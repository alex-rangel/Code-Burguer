const Categorias = require('../models/Categorias')
const User = require('../models/User')
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

        const id = req.Userid

        const usuario = await User.findByPk(id)

        if(!(usuario.admin)){
            return res.status(400).json({menssage: "Apagina so pode ser acessada por um administrador"})
        }

        const {filename: imagem} = req.file
        const { nome } = req.body

        const categoriaExistente = await Categorias.findOne({where: { nome }})
        console.log(categoriaExistente)

        if(categoriaExistente) {
            return res.status(400).json({error: "está categoria já existe"})
        }
        
        const novaCategoria = await Categorias.create({
            nome,
            imagem
        })
        
        res.status(200).json(novaCategoria)
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
        
        const {nome} = req.body

        
        await Categorias.update(
            { 
            nome
            }, 
            {where: {id}}
        )
        
        return res.status(200).json({menssage: "Produto atualizado com sucesso"})
    },

    async index(req, res) {
        
        const Categories = await Categorias.findAll()

        return res.status(200).json(Categories)
    },

      
}