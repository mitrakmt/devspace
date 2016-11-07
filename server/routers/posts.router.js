let postsRouter = require('express').Router()
const postsController = require('../controllers').postsController

postsRouter.route('/interactions/:postId')
  .get(postsController.GET_POST_INTERACTIONS)
    // Requires postId in req url
  .put(postsController.CREATE_INTERACTION)
    // Requires userId. postId in req url

postsRouter.route('/comments/:postId')
  .get(postsController.GET_POST_COMMENTS)
    // Requires postId in req url
  .post(postsController.CREATE_COMMENT)
    // Requires userId, content. postId in req url
  .put(postsController.UPDATE_COMMENT)
    // Requires userId, content, commentId. postId in req url
  .delete(postsController.DELETE_COMMENT)
    // Requires userId, commentId. postId in req url

postsRouter.route('/:postId')
  .get(postsController.GET_POST)
    // Requires postId in req url
  .put(postsController.UPDATE_POST)
    // Requires userId, content. postId in req url
  .delete(postsController.DELETE_POST)
    // Requires userId. postId in req url

postsRouter.route('/')
  .get(postsController.GET_POSTS)
    // Requires userId
  .post(postsController.CREATE_POST)
    // Requires userId, content

module.exports = postsRouter
