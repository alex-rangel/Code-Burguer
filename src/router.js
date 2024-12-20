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
rotas.get('/user', UserController.index)

rotas.post('/login', LoginController.store)

rotas.use(altenticacao)

rotas.post('/categoria',upload.single('file'), CategoriasController.store)
rotas.put('/categoria/:id', upload.single('file') ,CategoriasController.update)
rotas.get('/categoria',CategoriasController.index)

rotas.post('/produtos', upload.single('file') ,ProdutosController.store)
rotas.get('/produtos',ProdutosController.index)
rotas.put('/produtos/:id', upload.single('file') ,ProdutosController.update)
rotas.get('/produtos/:id', ProdutosController.indexById)

rotas.post('/pedidos', PedidosController.store)
rotas.get('/pedidos', PedidosController.index)
rotas.put('/pedidos/:Id', PedidosController.update)




module.exports = rotas 