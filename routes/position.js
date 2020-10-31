const express = require('express')
const controller = require('../controllers/position')
const passport = require('passport')
const router = express.Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getAll
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.create
)

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.update
)

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.remove
)

module.exports = router
