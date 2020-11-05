const Performer = require('../models/Performer')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const performers = await Performer.find({ user: req.user.id })
    res.status(200).json(performers)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const performer = await Performer.findById({
      _id: req.params.id
    })
    res.status(200).json(performer)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const performer = new Performer({
    name: req.body.name,
    user: req.user.id
  })
  try {
    await performer.save()
    res.status(201).json(performer)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.update = async (req, res) => {
  try {
    const updated = {
      name: req.body.name
    }
    const performer = await Performer.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(performer)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Performer.remove({ _id: req.params.id })
    res.status(200).json({ message: 'Сотрудник удален' })
  } catch (e) {
    errorHandler(res, e)
  }
}
