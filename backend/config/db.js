const mongoose = require('mongoose')

const dbConnection = () => {
  try {
    mongoose
      .connect(process.env.DB_Connection)
      .then(() => console.log('connected to db'))
  } catch (e) {
    console.log(e)
  }
}

module.exports = dbConnection
