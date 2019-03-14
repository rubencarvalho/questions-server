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

io.sockets.on('connection', socket => {
  console.log(`new connection id: ${socket.id}`)
  sendQuestions(socket)
})
function sendQuestions(socket) {
  console.log('im here')

  Question.find().then(questions => {
    console.log('im in then find')
    socket.emit('questions', questions)
  })
  setTimeout(() => {
    sendQuestions(socket)
  }, 4000)
}

function sendData(socket) {
  socket.emit(
    'data1',
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10)
  )
  console.log(`data sent`)
  setTimeout(() => {
    sendData(socket)
  }, 200)
}
