const Performer = require('../models/Performer')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  res.status(200).json({ message: `performers` })
}

module.exports.create = async function (req, res) {
  const performer = new Performer({
    name: req.body.name
  })
  try {
    await performer.save()
    res.status(201).json(performer)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.update = async (req, res) => {}
module.exports.remove = async function (req, res) {}
