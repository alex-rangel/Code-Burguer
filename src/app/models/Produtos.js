const { Model, DataTypes } = require('sequelize')


class Produtos extends Model{
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            preco: DataTypes.INTEGER,
            categoria: DataTypes.STRING,
            imagem: DataTypes.STRING,
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `http://localhost:${process.env.PORT}/image-product/${this.imagem}`
            }
        }}, {
            sequelize
        })

    }

}

module.exports = Produtos