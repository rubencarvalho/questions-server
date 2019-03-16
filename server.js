const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require('socket.io')

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
  console.log(`new connection id: ${socket.id}`)
})

io.sockets.on('disconnect', () => {
  console.log('user disconnected')
})

function sendNewQuestion(question) {
  io.emit('newQuestion', question)
}
