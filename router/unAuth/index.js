const express = require('express')
const Router = express.Router()
const Basic = require('../../models/basicInfo')
const { ensureAuth, ensureGuest } = require('../../middleware/auth')
const { validateUser } = require('../../middleware/validateToken')

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

Router.get('/logout', async (req, res) => {
    return res
        .clearCookie("access-token")
        .redirect('/')
})

Router.get('/users', validateUser, async (req, res) => {
    try {
        const getAllUsers = await Basic.find().lean()
        res.render('authPages/users/users', {
            layout: 'main',
            getAllUsers
        })
    } catch (err) {
        res.render('authPages/users/users', {
            layout: 'main',
            message: err
        })
    }
})

Router.get('/kyc', validateUser, async (req, res) => {
    res.render('authPages/kyc/kyc', {
        layout: 'error'
    })
})

Router.get('*', async (req, res) => {
    res.render('errors/404', {
        layout: 'error',
    })
})

module.exports = Router