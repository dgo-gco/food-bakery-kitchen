const errorRouter = require('express').Router()
const errorHandler = require('../controllers/errorController')

errorRouter.get('/*', errorHandler)

module.exports = errorRouter