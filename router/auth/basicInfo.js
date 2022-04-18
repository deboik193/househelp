const express = require('express')
const Router = express.Router()
const { renderChangePwd, renderForgotPwd, renderLogin, renderPost, renderResetPwd, renderVerifyEmail } = require('../../controllers/onboardingAuth')
const { renderDelete, renderGet, renderGetId, renderUpdate, renderKYC } = require('../../controllers/basicAuth')
const { validateUser } = require('../../middleware/validateToken')


Router.get('/', validateUser, renderGet)

Router.post('/', renderPost)

Router.post('/kyc', renderKYC)

Router.post('/forgot-pwd', renderForgotPwd)

Router.get('/change-password', renderChangePwd)

Router.post('/change-password', renderResetPwd)

Router.post('/login', renderLogin)

Router.get('/verify-email', renderVerifyEmail)

Router.get('/:Id', validateUser, renderGetId)

Router.patch('/:Id', validateUser, renderUpdate)

Router.delete('/:Id', validateUser, renderDelete)

module.exports = Router;