const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')


var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
    console.log('server is running on port: '+ port)
})