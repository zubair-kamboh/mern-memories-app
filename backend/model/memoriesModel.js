const mongoose = require('mongoose')

const memoriesSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  file: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('memories', memoriesSchema)
