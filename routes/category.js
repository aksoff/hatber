const express = require('express')
const controller = require('../controllers/category')
const passport = require('passport')
const router = express.Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getAll
)
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getById
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
