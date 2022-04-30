const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')
const dbConnection = require('./config/db')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000

app.use('/uploads', express.static('public'))

// middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use('/memories', require('./routes/memoriesRoutes'))

// db connection
dbConnection()

app.listen(port, () => console.log(`server running on port ${port}`))
