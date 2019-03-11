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
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
  },
  votes: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
})

module.exports = mongoose.model('Question', QuestionSchema)
