const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

router.get('/', (req, res) => {
  Question.find().then(questions => res.json(questions))
})

router.post('/', (req, res) => {
  if (req.body.name === '') {
    req.body.name = 'Anonymous'
  }
  Question.create(req.body)
    .then(question => {
      req.app.io.emit('newQuestion', question)
    })
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Question.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.post('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      if (
        question.votes.filter(vote => vote.user.toString() === req.body.userid)
          .length > 0
      ) {
        const removeIndex = question.votes
          .map(item => item.user.toString())
          .indexOf(req.body.userid)

        question.votes.splice(removeIndex, 1)

        question.save().then(question => res.json(question))
      } else if (
        question.votes.filter(vote => vote.user.toString() === req.body.userid)
          .length === 0
      ) {
        question.votes.unshift({ user: req.body.userid })

        question.save().then(question => res.json(question))
      }
    })
    .catch(err => res.status(404).json(err))
})

router.post('/seen/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      if (
        question.seen.filter(seen => seen.user.toString() === req.body.userid)
          .length === 0
      ) {
        question.seen.unshift({ user: req.body.userid })
        question.save().then(question => res.json(question))
      } else {
        res.json(question)
      }
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
