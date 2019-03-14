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
  authorid: {
    type: mongoose.SchemaTypes.String,
  },
  color: {
    type: mongoose.SchemaTypes.String,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
  },
  votes: [],
  seen: [],
})

module.exports = mongoose.model('Question', QuestionSchema)
