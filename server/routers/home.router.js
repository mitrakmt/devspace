let homeRouter = require('express').Router()
let homeController = require('../controllers').homeController

homeRouter.route('/github')
  // Requires req.headers.username
  .get(homeController.GET_GITHUB_ACTIVITY)

homeRouter.route('/feed')
  // Requires req.headers.userid
  .get(homeController.GET_USER_FEED)

homeRouter.route('/feed/posts')
  // Requires req.headers.userid
  .get(homeController.GET_FOLLOWED_USER_POSTS)

homeRouter.route('/feed/comments/:postId')
  // Requires req.params.postid
  .get(homeController.GET_POST_COMMENTS)

homeRouter.route('/feed/likes/:postId')
  // Requires req.params.postid
  .get(homeController.GET_POST_INTERACTIONS)

homeRouter.route('/sidebar')
  // Requires req.headers.userid and req.headers.username
  .get(homeController.GET_PROJECT_SIDEBAR)

module.exports = homeRouter
