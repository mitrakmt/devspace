let usersRouter = require('express').Router()
let usersController = require('../controllers').usersController
let passport = require('passport')

usersRouter.route('/profile')
  .get(usersController.GET_PROFILE)

usersRouter.route('/userProfile')
  .get(usersController.GET_USER)

usersRouter.route('/userProfileGithub')
  .get(usersController.GET_USER_GITHUB)

usersRouter.route('/profile/code')
  .get(usersController.GET_ALL_BYTES_OF_CODE)

usersRouter.route('/logout')
  .get(usersController.LOGOUT)

usersRouter.route('/login')
  .get(usersController.LOGIN)

usersRouter.route('/')
  .put(usersController.EDIT)
  .delete(usersController.DELETE_USER)

module.exports = usersRouter
