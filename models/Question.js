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
  status: {
    live: {
      type: mongoose.SchemaTypes.Boolean,
      default: true,
    },
    star: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    highlight: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    archive: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  votes: [],
  seen: [],
})

module.exports = mongoose.model('Question', QuestionSchema)
