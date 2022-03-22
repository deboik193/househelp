const express = require('express')
const Router = express.Router()
const { renderChangePwd, renderForgotPwd, renderLogin, renderLogout, renderPost, renderResetPwd, renderVerifyEmail } = require('../../controllers/onboardingAuth')
const { renderDelete, renderGet, renderGetId, renderUpdate } = require('../../controllers/basicAuth')
const { validateUser } = require('../../middleware/validateToken')

Router.get('/', validateUser, renderGet)

Router.get('/logout', validateUser, renderLogout)

Router.post('/', renderPost)

Router.post('/forgot-pwd', renderForgotPwd)

Router.get('/change-password', renderChangePwd)

Router.post('/change-password', renderResetPwd)

Router.post('/login', renderLogin)

Router.get('/verify-email', renderVerifyEmail)

Router.get('/:Id', validateUser, renderGetId)

Router.patch('/:Id', validateUser, renderUpdate)

Router.delete('/:Id', validateUser, renderDelete)

module.exports = Router;