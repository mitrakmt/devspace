let Posts = require('../models').postsModel
let postsController = {}

postsController.CREATE_POST = (req, res) => {
  let userId = req.headers['userid']
  // let username = req.headers['username']
  let content = req.body.content
  let paid = false
  let likes = 0
  Posts.CREATE_POST(userId, content, paid, likes)
    .then(result => {
      if (!result) {
        res.status(500).send('Server error')
      }
      console.log("++++results in ctrl", result)
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
  console.log(req.headers.userid)
  let userid = req.headers['userid']
  let postId = req.params.postId
  console.log(userid)
  if (!userid) {
    res.status(400).send('Bad request: missing userid')
  } else {
    Posts.UPDATE_INTERACTION(userid, postId)
    .then(post => {
      res.status(200).send(post)
    })
  }
}

postsController.CREATE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let username = req.headers['username']
  let postId = req.params.postId
  let content = req.body.content

  Posts.CREATE_COMMENT(userId, postId, content, username)
    .then(comment => {
      res.status(200).send(comment)
    })
}

postsController.UPDATE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let commentId = req.body.commentId
  let postId = req.params.postId

  Posts.UPDATE_COMMENT(userId, postId, commentId, content)
    .then(status => {
      res.status(200).send(status)
    })
}

postsController.DELETE_COMMENT = (req, res) => {
  let userId = req.headers['userid']
  let commentId = req.body.commentId
  let postId = req.params.postId

  Posts.DELETE_COMMENT(userId, postId, commentId)
    .then(comment => {
      res.status(200).send(comment)
    })
}
module.exports = postsController
