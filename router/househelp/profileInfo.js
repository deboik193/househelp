const express = require('express')
const Router = express.Router()
const controllers = require('../../controllers/househelp/profileInfo')

Router.get('/', controllers.renderGet)

Router.post('/', controllers.renderPost)

Router.get('/:Id', controllers.renderGetId)

Router.patch('/:Id', controllers.renderUpdate)

Router.delete('/:Id', controllers.renderDelete)

module.exports = Router;