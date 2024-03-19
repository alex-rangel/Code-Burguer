require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
const rotas = require('./router')
require('./database')

const {resolve} = require('path')

app.use(express.json())

app.use('/image-product' ,express.static(resolve(__dirname, '..', 'upload')))
app.use('/image-categoria' ,express.static(resolve(__dirname, '..', 'upload')))
app.use(rotas)

app.listen(process.env.PORT, () => {
    console.log('servidor rodando')
})