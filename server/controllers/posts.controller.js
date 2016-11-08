let postsController = {}
let Posts = require('../models').postsModel

postsController.CREATE_POST = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let paid = false
  let likes = 0
  Posts.CREATE_POST(userId, content, paid, likes)
    .then(result => {
      if (!result) {
        res.status(500).send('Server error')
      }
      res.status(200).send(result)
    })
}

postsController.UPDATE_POST = (req, res) => {
  let userId = req.headers['userid']
  let postId = req.params.postId
  let content = req.body.content

  Posts.UPDATE_POST(userId, postId, content)
    .then(post => {
      res.status(200).send(post)
    })
}

postsController.DELETE_POST = (req, res) => {
  let userId = req.headers['userid']
  let postId = req.params.postId

  Posts.DELETE_POST(userId, postId)
    .then(status => {
      res.status(200).send(status)
    })
}

postsController.UPDATE_INTERACTION = (req, res) => {
  let userId = req.headers['userid']
  let postId = req.params.postId
  Posts.UPDATE_INTERACTION(userId, postId)
    .then(result => {
      res.status(200).send('Interaction updated')
    })
}

postsController.CREATE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let postId = req.params.postId
  let content = req.body.content
  console.log(req.params.postId)

  Posts.CREATE_COMMENT(userId, postId, content)
    .then(comment => {
      res.status(200).send(comment)
    })
}

postsController.UPDATE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let commentId = req.body.commentId
  let postId = req.params.postId
}

postsController.DELETE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let commentId = req.body.commentId
  let postId = req.params.postId
}
module.exports = postsController
