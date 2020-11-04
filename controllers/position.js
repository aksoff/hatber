const Position = require('../models/Position')
const Category = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const positions = await Position.find({ user: req.user.id })
    res.status(200).json(positions)
  } catch {}
}

module.exports.create = async function (req, res) {
  const position = new Position({
    name: req.body.name,
    cost: req.body.cost,
    category: req.body.category,
    user: req.user.id
  })
  try {
    await position.save()
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  try {
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
  } catch (e) {
    errorHandler(res, e)
  }
}
