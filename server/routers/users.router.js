let usersRouter = require('express').Router()
let usersController = require('../controllers').usersController
let passport = require('passport')

usersRouter.route('/profile')
  .get(usersController.GET_PROFILE)

usersRouter.route('/userProfile')
  .get(usersController.GET_USER)

usersRouter.route('/userProfileGithub')
  .get(usersController.GET_USER_GITHUB)

usersRouter.route('/avatar')
  .get(usersController.GET_AVATAR)

usersRouter.route('/profile/feed')
  .get(usersController.GET_USER_PROFILE_FEED)

usersRouter.route('/getMemberStatus')
  .get(usersController.GET_MEMBER_STATUS)

usersRouter.route('/profile/code')
  .get(usersController.GET_ALL_BYTES_OF_CODE)

usersRouter.route('/search')
  .get(usersController.SEARCH_USERS)
  
usersRouter.route('/logout')
  .get(usersController.LOGOUT)

usersRouter.route('/login')
  .get(usersController.LOGIN)

usersRouter.route('/')
  .put(usersController.EDIT)
  .delete(usersController.DELETE_USER)

module.exports = usersRouter
