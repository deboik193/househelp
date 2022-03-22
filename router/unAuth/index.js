const express = require('express')
const Router = express.Router()
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

Router.get('/', ensureGuest, (req, res) => {
    res.render('onboarding/login', {
        layout: 'login'
    })
})

Router.get('/register', ensureGuest, (req, res) => {
    res.render('onboarding/register', {
        layout: 'login'
    })
})

Router.get('/recovery-password', ensureGuest, (req, res) => {
    res.render('onboarding/recovery-password', {
        layout: 'login'
    })
})

Router.get('/dashboard', ensureAuth, async (req, res) => {
    res.render('authPages/dashboard/index', {
        layout: 'main'
    })
})

Router.get('*', async (req, res) => {
    res.render('errors/404', {
        layout: 'error'
    })
})


module.exports = Router