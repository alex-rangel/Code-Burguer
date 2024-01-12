const multer = require('multer')
const {resolve, extname} = require('path')
const { v4 } = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname, '..', '..', 'upload'))
    },
    filename: function (req, file, cb) {
      cb(null, v4() + extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload