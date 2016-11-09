let usersRouter = require('express').Router()
let usersController = require('../controllers').usersController
const passport = require('passport')

usersRouter.route('/profile')
  .get(usersController.GET_PROFILE)

module.exports = usersRouter
