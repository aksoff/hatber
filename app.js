const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const performerRoutes = require('./routes/performer')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')

const app = express()

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch((error) => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/performer', performerRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
