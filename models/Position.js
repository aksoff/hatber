const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  cost: {
    type: Number
  },
  category: {
    ref: 'categories',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('positions', positionSchema)
