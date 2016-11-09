let usersRouter = require('express').Router()
let usersController = require('../controllers').usersController
let passport = require('passport')

usersRouter.route('/profile')
  .get(usersController.GET_PROFILE)

usersRouter.route('/login')
  .get(usersController.LOGIN)

usersRouter.route('/logout')
  .get(usersController.LOGOUT)

usersRouter.route('/')
  .put(usersController.EDIT)
  .delete(usersController.DELETE_USER)

module.exports = usersRouter
