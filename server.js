const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require('socket.io')
const Question = require('./models/Question')

mongoose.connect('mongodb://localhost:27017/q', {
  useNewUrlParser: true,
})
app.use(cors())
app.use(express.json())
app.use('/questions', require('./routes/questions.js'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log('Server ready on port ' + port)
})

const io = socket(server)
app.io = io

io.sockets.on('connection', socket => {
  console.log(Object.keys(io.sockets.connected).length)
  socket.on('load questions', () => {
    console.log('HI')
    Question.find().then(questions =>
      socket.emit('questions are here', questions)
    )
  })
  console.log(`new connection id: ${socket.id}`)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
