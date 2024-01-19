const Pedidos = require('../models/Pedidos')
const Produto = require('../models/Produtos')
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

        const IdProdutos = req.body.produtos.map((produto) => {
            return produto.id
        })

        const produtos = await Produto.findAll({where: 
            {id: IdProdutos},
            include:{
                association: 'categoria',
                attributes: ['nome']
            },
        })

        const PedidoEditado = produtos.map((produto) => {
            const indexQuantidade = req.body.produtos.findIndex((reqproduto) => reqproduto.id === produto.id)

            const produtoEditado = {
                id: produto.id,
                nome:produto.nome,
                preco:produto.preco,
                categoria:produto.categoria.nome,
                url:produto.url,
                quantidade:req.body.produtos[indexQuantidade].quantidade,
            }

            return produtoEditado
        })
       
       
        const PedidoCriado = {
            user:{
                id: req.Userid,
                nome: req. Username
            },
            produtos:PedidoEditado,
            status: "pedido realizado"
       }

       const newPedido = await Pedidos.create(PedidoCriado)

       return res.json(PedidoCriado)
    },

    
    async index(req, res) {
        
        const listaPedidos = await Pedidos.find()

        return res.status(200).json(listaPedidos)
    },

    async update(req, res) {
        const{id} = req.params
        const { status } = req.body

        try{
        const PedidoAtualizado = await Pedidos.updateOne({_id: id}, { status })
        }catch(err) {
            return res.status(400).json({error:err.menssage})
        }
        
        return res.status(200).json({menssage: "pedido atualizado com sucesso"})
    }

      
}