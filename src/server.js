require('dotenv').config()

const express = require('express')
const app = express()

const rotas = require('./router')
require('./database')

const {resolve} = require('path')

app.use(express.json())
app.use(rotas)
app.use('/image-product' ,express.static(resolve(__dirname, '..', 'upload')))
app.use('/image-categoria' ,express.static(resolve(__dirname, '..', 'upload')))

app.listen(4000, () => {
    console.log('servidor rodando')
})