const { Router } = require("express")
const rotas = Router()

const multer = require('multer')
const upload = require('./config/multer')


const UserController = require('./app/controllers/UserController')
const LoginController = require('./app/controllers/LoginController')
const ProdutosController = require('./app/controllers/produtosController')
const CategoriasController = require('./app/controllers/CategoriasControllers')
const PedidosController = require('./app/controllers/PedidosControllers')

const altenticacao = require('./app/middleware/autenticacao').autenticacao


rotas.post('/user', UserController.store)

rotas.post('/login', LoginController.store)

rotas.use(altenticacao)

rotas.post('/produtos', upload.single('file') ,ProdutosController.store)
rotas.get('/produtos',ProdutosController.index)
rotas.put('/produtos/:id', upload.single('file') ,ProdutosController.update)

rotas.post('/categoria', CategoriasController.store)

rotas.post('/pedidos', PedidosController.store)
rotas.get('/pedidos', PedidosController.index)
rotas.put('/pedidos/:Id', PedidosController.update)



module.exports = rotas 