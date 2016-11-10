let postsRouter = require('express').Router()
const postsController = require('../controllers').postsController

postsRouter.route('/interactions/:postId')
  .put(postsController.UPDATE_INTERACTION)
    // Requires userId. postId in req url

postsRouter.route('/comments/:postId')
  .post(postsController.CREATE_COMMENT)
    // Requires userId, username, content. postId in req url
  .put(postsController.UPDATE_COMMENT)
    // Requires userId, content, commentId. postId in req url
  .delete(postsController.DELETE_COMMENT)
    // Requires userId, commentId. postId in req url

postsRouter.route('/:postId')
  .put(postsController.UPDATE_POST)
    // Requires userId, content. postId in req url
  .delete(postsController.DELETE_POST)
    // Requires userId. postId in req url

postsRouter.route('/')
  .post(postsController.CREATE_POST)
    // Requires userId, content

module.exports = postsRouter
