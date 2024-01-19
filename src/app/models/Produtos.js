const { Model, DataTypes } = require('sequelize')


class Produtos extends Model{
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            preco: DataTypes.INTEGER,
            categoria_id: DataTypes.INTEGER,
            imagem: DataTypes.STRING,
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `http://localhost:${process.env.PORT}/image-product/${this.imagem}`
            }
        },
            oferta: DataTypes.BOOLEAN
    }, {
            sequelize
        })

    }

    static associate(models) {
        this.belongsTo(models.Categorias, {foreignKey: 'categoria_id', as: 'categoria' })
    }

}

module.exports = Produtos