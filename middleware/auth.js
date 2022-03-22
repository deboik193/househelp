module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.cookies['access-token']) {
            return next()
        } else {
            res.redirect('/')
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.cookies['access-token']) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    },
}