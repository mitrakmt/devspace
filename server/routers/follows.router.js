let followsRouter = require('express').Router()
let followsController = require('../controllers').followsController

followsRouter.route('/:userId/followers')
  // Gets a user's followers, requires req.params.userId
  .get(followsController.GET_FOLLOWERS)
  // Deletes a user's followers, requires req.params.userId and req.body.followerId
  .delete(followsController.DELETE_FOLLOWER)

followsRouter.route('/:userId/following')
  // Gets users a user is following, requires req.params.userId
  .get(followsController.GET_FOLLOWING)
  // Follow or unfollow a user, requires req.params.userId and req.body.followerId
  .post(followsController.POST_FOLLOWING)

followsRouter.route('/:userId/followStatus')
  .get(followsController.GET_FOLLOW_STATUS)

module.exports = followsRouter
