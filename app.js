const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')

//.env load config
dotenv.config({ path: "./config/config.env" })

//database connection
require('./config/database')

const app = express()

// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// handle bars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// static folder
app.use(express.static(path.join(__dirname, 'public')))

const cookieParser = require('cookie-parser')
const error = require("./middleware/error")
app.use(cookieParser())
app.use(error.errorHandler)

app.use('/', require('./router/unAuth/index'))
app.use('/basic', require('./router/auth/basicInfo'))
app.use('/profile', require('./router/auth/profileInfo'))

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`))