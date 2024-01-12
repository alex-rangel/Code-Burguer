const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model{
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            presenha: DataTypes.VIRTUAL,
            senha: DataTypes.STRING,
            admin: DataTypes.BOOLEAN
        }, {
            sequelize
        })

        User.addHook('beforeSave', async (user) =>{
            user.senha = await bcrypt.hash(user.presenha, 10)
        })

        return this
    }

    checkerSenha(senha) {
        return bcrypt.compare(senha, this.senha)
    }
}

module.exports = User