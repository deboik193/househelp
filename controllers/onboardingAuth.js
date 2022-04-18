
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const Basic = require('../models/basicInfo')
const { accessToken, refreshToken } = require('../middleware/validateToken')
const { welcomeEmail } = require('../lib/emails')

/*
this code below transport email via SMTP mailtrap
*/
const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

/*
this route will register a user
and an email should be sent to the user 
for registration and to verify email
*/
exports.renderPost = async (req, res) => {
    const _body = req.body
    const user = new Basic(_body)

    try {
        const checkIfEmailExist = await Basic.findOne({ email: user.email }).lean()
        if (!checkIfEmailExist) {
            if (_body.password.length < 5) {
                res.render('onboarding/register', { layout: 'login', message: "password is too short" })
            } else {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
                user.emailToken = await crypto.randomBytes(64).toString('hex')
                user.isVerified = false
                user.admin = false

                await user.save()
                res.render('onboarding/login-success', { layout: 'login', message: `registered successfully, an email have been sent to ${user.email}, click on the link to verify your email`, id: user._id, })
                const mailOption = {
                    from: `househelp.com.ng <${process.env.CUSTOM_EMAIL}>`,
                    to: user.email,
                    subject: '[Verify your email]',
                    html: welcomeEmail('Please confirm your email address by clicking the link below.', `${req.protocol}://${req.headers.host}/basic/verify-email?token=${user.emailToken}`, 'Confirm email address')
                }

                transporter.sendMail(mailOption).then((res) => {
                    return res
                }).catch((err) => {
                    res.render('onboarding/register', { layout: 'login', message: err })
                })
            }

        } else {
            res.render('onboarding/register', { layout: 'login', message: "User already exist" })
        }

    } catch (err) {
        res.render('onboarding/register', { layout: 'login', message: err })
    }
}

/*
this route send a verification email, to confirm if it is a correct email addrress
*/
exports.renderVerifyEmail = async (req, res) => {

    const emailToken = req.query.token

    try {
        const user = await Basic.find({emailToken: emailToken}).lean()
        if (user[0].isVerified) {
            res.render('onboarding/verify-email', {
                layout: 'login',
                message: 'your email is verified'
            })
        } else {
            if (user[0].emailToken !== emailToken) {
                res.render('onboarding/verify-email', {
                    layout: 'login',
                    message: 'your email token is invalid or expired'
                })
            } else {
                await Basic.findByIdAndUpdate({_id: user[0]._id}, { isVerified: true }).lean()
                res.render('onboarding/verify-email', {
                    layout: 'login',
                    message: 'congratulations your email is verified'
                })
            }
        }

    } catch (e) {
        res.render('onboarding/verify-email', {
            layout: 'login',
            message: e
        })
    }
}

/*
this route will log a user in if credentials correspond
*/
exports.renderLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Basic.findOne({ email: email }).lean()
        const comparedPwd = await bcrypt.compare(password, user.password)
        if (user && comparedPwd) {
            if (user.isVerified) {
                const createRefreshToken = refreshToken(user)
                res.cookie('access-token', createRefreshToken, {
                    maxAge: 60 * 60 * 24 * 1000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                res.redirect('/dashboard')
            } else {
                res.render('onboarding/login', {
                    layout: 'login',
                    message: "Your email is not verified "
                })
            }

        } else {
            res.render('onboarding/login', {
                layout: 'login',
                message: "email or password is incorrect"
            })
        }
    } catch (e) {
        res.render('onboarding/login', {
            layout: 'login',
            message: 'User Does not exist'
        })
    }
},

    /*
    this route will send an email with a link to change password route
    */

    exports.renderForgotPwd = async (req, res) => {
        const { email } = req.body

        try {

            const checkIfEmailExist = await Basic.findOne({ email: email }).lean()
            if (checkIfEmailExist) {
                res.render('onboarding/login-success', {
                    layout: 'login',
                    message: `a password recovery email have been sent to ${checkIfEmailExist.email} please check your email`
                })

                const mailOption = {
                    from: `househelp.com.ng <${process.env.CUSTOM_EMAIL}>`,
                    to: checkIfEmailExist.email,
                    subject: '[Change Password]',
                    html: welcomeEmail('Please change your password by clicking the link below.', `${req.protocol}://${req.headers.host}/basic/change-password?pwd=${checkIfEmailExist._id}`, 'Change Password')
                }

                transporter.sendMail(mailOption).then((res) => {
                    return res
                }).catch((err) => {
                    res.render('onboarding/recovery-password', { layout: 'login', message: err })
                })
            } else {
                res.render('onboarding/recovery-password', {
                    layout: 'login',
                    message: "invalid credentials, please check and try again"
                })
            }

        } catch (error) {
            res.render('onboarding/recovery-password', {
                layout: 'login',
                message: error
            })
        }
    }

/*
this route will call the UI for change password
*/

exports.renderChangePwd = async (req, res) => {
    const id = req.query.pwd
    try {
        const user = await Basic.findOne({ _id: id }).lean()
        if (user) {
            res.render('onboarding/change-password', {
                layout: 'login'
            })
        } else {
            res.render('onboarding/login-success', {
                layout: 'login',
                message: 'change password link not verified or expired'
            })
        }
    } catch (error) {
        res.render('onboarding/recovery-password', {
            layout: 'login',
            message: error
        })
    }
}

/*
this route will change a user password
*/

exports.renderResetPwd = async (req, res) => {
    let { password, pass } = req.body
    try {
        if (password !== pass || pass.length < 5) {
            res.render('onboarding/change-password', {
                layout: 'login',
                message: 'the password confirmation does not match or too short'
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            let passw = await bcrypt.hash(pass, salt)
            await Basic.findOneAndUpdate({ password: passw }).lean()
            res.render('onboarding/login-success', {
                layout: 'login',
                message: 'password updated successfuly'
            })
        }
    } catch (error) {
        res.render('onboarding/change-password', {
            layout: 'login',
            message: error
        })
    }
}   
