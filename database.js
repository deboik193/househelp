const mongoose = require('mongoose')

const DB_connection = mongoose.connect(process.env.DB_Connection, ({ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), () => {
    console.log("database connection esterblished")
})

module.exports = DB_connection