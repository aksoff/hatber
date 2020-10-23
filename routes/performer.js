const express = require('express')
const controller = require('../controllers/performer')
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

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getById
)
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.remove
)
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.update
)

module.exports = router
