let followsController = {}
let Follows = require('../models').Follows

followsController.GET_FOLLOWERS = (req, res) => {
  Follows.GET_FOLLOWERS(req.params.userId)
    .then(followers => {
      res.status(200).send(followers)
    })
}

followsController.DELETE_FOLLOWER = (req, res) => {
  Follows.DELETE_FOLLOWER(req.params.userId, req.body.followerId)
    .then(numDeleted => {
      res.status(200).send('Deleted follower')
    })
}

followsController.GET_FOLLOWING = (req, res) => {
  Follows.GET_FOLLOWING(req.params.userId)
    .then(followedUsers => {
      res.status(200).send(followedUsers)
    })
}

followsController.POST_FOLLOWING = (req, res) => {
  Follows.POST_FOLLOWING(req.params.userId, req.body.followerId)
    .then(followStatus => {
      res.status(200).send(followStatus)
    })
}

module.exports = followsController
