const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    const passwordCompareResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )
    if (passwordCompareResult) {
      // Generate token
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: keys.tokenExpired})
      res.status(200).json({ token: `Bearer ${token}`})
    } else {
      res.status(401).json({ message: 'Error password' })
    }
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    // User exist
    res.status(409).json({ message: 'User email exist' })
  } else {
    // Create user
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
