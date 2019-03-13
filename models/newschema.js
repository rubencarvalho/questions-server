const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  message: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    default: 'Anonymous',
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
  },
  seen: [],
  liked: [],
})

module.exports = mongoose.model('Question', QuestionSchema)
