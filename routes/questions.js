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
  if (req.body.message.length < 161) {
    Question.create(req.body)
      .then(question => {
        req.app.io.emit('newQuestion', question)
        res.json(question)
      })
      .catch(err => res.json(err))
  }
})

router.delete('/:id', (req, res) => {
  Card.findOneAndDelete({ _id: req.params.id })
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

        question
          .save()
          .then(req.app.io.emit('newLike', question))
          .catch(err => console.log(err))
        res.status(200).json({ question })
      } else if (
        question.votes.filter(vote => vote.user.toString() === req.body.userid)
          .length === 0
      ) {
        question.votes.unshift({ user: req.body.userid })

        question
          .save()
          .then(res => {
            req.app.io.emit('newLike', question)
          })
          .catch(err => console.log(err))
        res.status(200).json({ question })
      }
    })
    .catch(err => res.status(404).json(err))
})
// CHANGE TO ONLY GET AN ARRAY FROM QUESTIONS SEEN
router.post('/seen/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      if (
        question.seen.filter(seen => seen.user.toString() === req.body.userid)
          .length === 0
      ) {
        question.seen.unshift({ user: req.body.userid })
        question
          .save()
          .then(question => res.json(question))
          .catch(err => console.log(err))
      } else {
        res.json(question)
      }
    })
    .catch(err => res.status(404).json(err))
})

router.put('/update', (req, res) => {
  console.log(req.body)
  Question.find({
    _id: { $in: req.body.questions },
  })
    .then(questions =>
      questions.forEach(question => {
        if (
          question.seen.filter(seen => seen.user.toString() === req.body.userid)
            .length === 0
        ) {
          question.seen.unshift({ user: req.body.userid })
          delete question.__v
          question.save().catch(err => console.log(err))
        }
      })
    )
    .catch(err => console.log(err))
  res.status(200).json('Success')
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
