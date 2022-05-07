const express = require('express')
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('hello'))
}
// db connection
dbConnection()

app.listen(port, () => console.log(`server running on port ${port}`))
