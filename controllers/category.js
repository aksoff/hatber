const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    res.status(200).json({ message: `categories` })
  } catch {}
}

module.exports.create = async function (req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id
  })
  try {
    await category.save
    res.status(201).json(category)
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
