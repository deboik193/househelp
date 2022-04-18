const { sign, verify } = require('jsonwebtoken');
const Basic = require('../models/basicInfo')

// const accessToken = (user) => {
//     const token = sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "15m" })
//     return token
// }
const refreshToken = (user) => {
    const token = sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "1d" })
    return token
}

const validateUser = (req, res, next) => {
    const accessToken = req.cookies['access-token']
    if (accessToken) {
        verify(accessToken, process.env.TOKEN_SECRET, (err, result) => {
            if (err) {
                return res.render('onboarding/login', {
                    layout: 'login',
                    message: error
                });
            } else { 
                next()
            }
        })
    } else {
        return res
            .status(401)
            .render('onboarding/login', {
                layout: 'login',
                message: "User not Authenticated "
            });
    }
}

const currentUser = (req, res, next) => {
    const accessToken = req.cookies['access-token']

    if (accessToken) {
        verify(accessToken, process.env.TOKEN_SECRET, async (err, result) => {
            if (err) {
                res.locals.users = null
                next()
            } else {
                let getUser = await Basic.findById(result.id).lean()
                res.locals.users = getUser
                next()
            }
        })
    } else {
        res.locals.users = null
        next()
    }
}

module.exports = { validateUser, refreshToken, currentUser }