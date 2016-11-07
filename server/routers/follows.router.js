let followsRouter = require('express').Router()
let followsController = require('../controllers').followsController

followsRouter.route('/:userId/followers')
  .get(followsController.GET_FOLLOWERS)
  .post(followsController.POST_FOLLOWERS)
  .delete(followsController.DELETE_FOLLOWERS)

followsRouter.route('/:userId/following')
  .get(followsController.GET_FOLLOWING)
  .post(followsController.POST_FOLLOWING)
  .delete(followsController.DELETE_FOLLOWING)

module.exports = followsRouter
