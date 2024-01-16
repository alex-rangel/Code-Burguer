const { Model, DataTypes } = require('sequelize')


class Categorias extends Model{
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        },{
            sequelize
        })

    }
}

module.exports = Categorias