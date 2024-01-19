const { Model, DataTypes } = require('sequelize')


class Categorias extends Model{
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            imagem: DataTypes.STRING,
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `http://localhost:${process.env.PORT}/image-categoria/${this.imagem}`
            }}
        },{
            sequelize
        })

    }
}

module.exports = Categorias