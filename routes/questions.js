const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

router.get('/', (req, res) => {
  Question.find().then(questions => res.json(questions))
})

router.post('/', (req, res) => {
  Card.create(req.body)
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Card.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.post('/:id', (req, res) => {
  Card.findById(req.params.id).then(card => {
    if (card.likes.includes(req.body.userid)) {
    }
  })
})
// router.patch('/:id', (req, res) => {
//   Card.findOneAndUpdate(
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
