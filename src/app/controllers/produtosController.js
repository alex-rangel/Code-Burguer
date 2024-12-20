const Produto = require('../models/Produtos')
const User = require('../models/User')
const yup = require('yup')

module.exports = {
    async store(req, res) {

        const Schema = yup.object().shape({
            nome: yup.string().required("A informação do nome é obrigatorio"),
            preco: yup.number().required(),
            categoria_id: yup.number().required(),
            oferta: yup.boolean(),
        })

        try {
            await Schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ errado: err.message })
        }

        const id = req.Userid

        const usuario = await User.findByPk(id)

        if (!(usuario.admin)) {
            return res.status(400).json({ menssage: "Apagina so pode ser acessada por um administrador" })
        }

        const { filename: imagem } = req.file
        const { nome, preco, categoria_id, oferta } = req.body

        const newProduto = await Produto.create({
            nome,
            preco,
            categoria_id,
            imagem,
            oferta,
        })

        res.status(200).json(newProduto)
    },

    async index(req, res) {

        const id = req.Userid

        const usuario = await User.findByPk(id)

        const produtos = await Produto.findAll({
            include: {
                association: 'categoria',
                attributes: ['nome']
            }
        })

        return res.status(200).json(produtos)

    },

    async indexById(req, res) {

        const { id } = req.params

        const Id = req.Userid

        const usuario = await User.findByPk(Id)

        const produto = await Produto.findByPk(id)

        return res.status(200).json(produto)
    },

    async update(req, res) {
        const { id } = req.params

        const Id = req.Userid

        const usuario = await User.findByPk(Id)

        if (!(usuario.admin)) {
            return res.status(400).json({ menssage: "Apagina so pode ser acessada por um administrador" })
        }

        let imagem
        if (req.file) {
            imagem = req.file.filename
            console.log('foi')
        }

        console.log(imagem)

        const { nome, preco, categoria_id, oferta } = req.body


        const atualizado = await Produto.update(
            {
                nome,
                preco,
                categoria_id,
                imagem,
                oferta,
            },
            { where: { id } }
        )

        console.log(atualizado)
        console.log('foi')

        return res.status(200).json({ menssage: "Produto atualizado com sucesso" })
    }


}