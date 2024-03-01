const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../app/models/User')
const Produto = require('../app/models/Produtos')
const Categorias = require('../app/models/Categorias')

const mongoose = require('mongoose')

    function conexao() {
    const connection = new Sequelize(dbConfig)

    User.init(connection)
    Produto.init(connection)
    Categorias.init(connection)

    Produto.associate(connection.models)
    

    const mongoConnection = mongoose.connect('mongodb://localhost:27017/Codeburguer')
    .then(() => console.log("banco de dados conectado"))
     }


module.exports = conexao()