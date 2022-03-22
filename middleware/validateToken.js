const { sign, verify } = require('jsonwebtoken');

const accessToken = (user) => {
    const token = sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "15m" })
    return token
}
const refreshToken = (user) => {
    const token = sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "60d" })
    return token
}

const validateUser = (req, res, next) => {
    const accessToken = req.cookies['access-token']
    if (!accessToken) {
        return res
            .status(401)
            .render('onboarding/login', {
                layout: 'login',
                message: "User not Authenticated "
            });
    } else {
        try {
            const isAuthenticated = verify(accessToken, process.env.TOKEN_SECRET)
            if (isAuthenticated) {
                req.authenticated = true
                return next()
            }
        } catch (error) {
            return res.render('authPages/dashboard/index', {
                layout: 'main',
                message: error
            });
        }
    }
}

module.exports = { accessToken, validateUser, refreshToken }