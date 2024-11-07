const express = require('express')
const mongoose = require('mongoose') 
const cors = require("cors")
require('dotenv').config()
const allRoutes = require('./routes/index.js')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/oods').then(console.log('mongodb Connected'))

app.use('/api/v1',allRoutes)

app.listen(3000, () => {
    console.log("server liston at port 3000")
})