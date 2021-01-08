const express = require('express')
const app = express()
const adminBasicInfo = require('./router/admin/basicInfo')
const adminProfileInfo = require('./router/admin/profileInfo')
const hireBasicInfo = require('./router/hire/basicInfo')
const hireProfileInfo = require('./router/hire/profileInfo')
const helpBasicInfo = require('./router/househelp/basicInfo')
const helpProfileInfo = require('./router/househelp/profileInfo')

app.use(express.json())

app.use('/admin/basic', adminBasicInfo)
app.use('/admin/profile', adminProfileInfo)
app.use('/hire/basic', hireBasicInfo)
app.use('/hire/profile', hireProfileInfo)
app.use('/help/basic', helpBasicInfo)
app.use('/help/profile', helpProfileInfo)


//.env
require('dotenv/config');
//database connection
require('./database')

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is runing on ${port}`)
})