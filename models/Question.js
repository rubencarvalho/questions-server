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
  voteids: [mongoose.SchemaTypes.String],
  liked: {
    type: mongoose.SchemaTypes.String,
    default: true,
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
  },
  isnew: {
    type: mongoose.SchemaTypes.Boolean,
    default: true,
  },
})

module.exports = mongoose.model('Question', QuestionSchema)
