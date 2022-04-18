module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.cookies['access-token']) {
            res.set('Cache-Control', 'no-store')
            return next()
        } else {
            res.redirect('/')
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.cookies['access-token']) {
            res.redirect('/dashboard')
        } else {
            res.set('Cache-Control', 'no-store')
            return next()
        }
    },
}