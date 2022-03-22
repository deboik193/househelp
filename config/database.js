const mongoose = require('mongoose')

const DB_connection = mongoose.connect(process.env.CONNECT_DB, ({ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }), (error, data) => {
    if (!error) {
        console.log("database connection esterblished")
    }else {
        throw error
    }
})

module.exports = DB_connection