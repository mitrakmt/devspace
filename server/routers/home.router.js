let homeRouter = require('express').Router()
let homeController = require('../controllers').homeController

homeRouter.route('/:userId')
  .get(homeController.GET_HOME)

module.exports = homeRouter
