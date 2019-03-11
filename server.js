const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/q', {
  useNewUrlParser: true,
})
app.use(cors())
app.use(express.json())

app.use('/questions', require('./routes/questions.js'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
