let homeRouter = require('express').Router()
let homeController = require('../controllers').homeController

// localhost:8000/api/home/github
homeRouter.route('/github')
  // requires req.headers.username
  .get(homeController.GET_GITHUB_ACTIVITY)

// localhost:8000/api/home/feed
homeRouter.route('/feed')
  // requires req.headers.userId
  .get(homeController.GET_USER_FEED)

// localhost:8000/api/home/sidebar
homeRouter.route('/sidebar')
  // requires req.headers.userId and req.headers.username
  .get(homeController.GET_PROJECT_SIDEBAR)

module.exports = homeRouter
