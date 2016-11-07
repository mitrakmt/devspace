let postsController = {}

postsController.CREATE_INTERACTION = (req, res) => {
  // userId, postId in reql url
}

postsController.CREATE_COMMENT = (req, res) => {
  // userId, content. postId in req url
}

postsController.UPDATE_COMMENT = (req, res) => {
  // userId, content, commentId. postId in req url
}

postsController.DELETE_COMMENT = (req, res) => {
  // userId, commentId. post id in req url
}

postsController.UPDATE_POST = (req, res) => {
  // userId, content. postId in req url
}

postsController.DELETE_POST = (req, res) => {
  // userId. postId in req url
}

postsController.CREATE_POST = (req, res) => {
  // userId, content
}

module.exports = postsController
