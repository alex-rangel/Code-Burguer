const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedidosSchema = new Schema({
        user: {
            id: {
                type: String,
                required: true
            },
            nome:{
                type: String,
                required: true,
            }
        },
        produtos: [{
            id:{
                type: Number,
                required: true,
            },
            nome: {
                type: String,
                required: true,
            },
            preco:{
                type: Number,
                required: true,
            },
            categoria:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            },
            quantidade:{
                type: Number,
                required: true,
            }
        }],
        status:{
            type: String,
            required: true,
        },
  },
  {
    timestamps: true,
  }
  );

  module.exports = mongoose.model('pedidos', pedidosSchema)