const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../app/models/User')
const Produto = require('../app/models/Produtos')

function conexao() {
const connection = new Sequelize(dbConfig)

User.init(connection)
Produto.init(connection)
}

module.exports = conexao()