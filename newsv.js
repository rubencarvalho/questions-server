const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200)
    res.end(data)
  })
}

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function(data) {
    console.log(data)
  })
})

mongoose.connect('mongodb://localhost:27017/q', {
  useNewUrlParser: true,
})

//app.use('/questions', require('./routes/questions.js'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
