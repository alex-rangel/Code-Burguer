// const Sequelize = require('sequelize');
// const dbConfig = require('../config/database');
// const User = require('../app/models/User')
// const Produto = require('../app/models/Produtos')
// const Categorias = require('../app/models/Categorias')

// const mongoose = require('mongoose')

// const models = [User, Produto, Categorias]

// class Database {
//     constructor(){
//         this.init()
//         this.mongo()
//     }

//     init() {
//     this.connection = new Sequelize(dbConfig)

//     models.map((model) => model.init(this.connection))

//     //Produto.associate(this.connection.models)
//     }

//     mongo(){
//         this.mongoConnection = mongoose.connect('mongodb://localhost:27017/Codeburguer'
//         // {
//         //     useNewUrlParser: true,
//         //     useUnifiedTopology: true,
//         // }
//         ).then(() => console.log("banco de dados conectado"))
//     }
// }

// module.exports = new Database()