const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

router.get('/', (req, res) => {
  Question.find().then(questions => res.json(questions))
})

router.post('/', (req, res) => {
  Question.create(req.body)
    .then(question => res.json(question))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Question.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.post('/:id', (req, res) => {
  Question.findById(req.params.id).then(question => {
    if (question.likes.includes(req.body.userid)) {
    }
  })
})
// router.patch('/:id', (req, res) => {
//   Question.findOneAndUpdate(
//     { _id: req.params.id },
//     { $addToSet: { voteids: req.body.userid } }
//   ).then(
//     Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//     })
//       .then(data => res.json(data))
//       .catch(err => res.json(err))
//   )
// })

module.exports = router
