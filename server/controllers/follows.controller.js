let Follows = require('../models').followsModel
let followsController = {}

followsController.GET_FOLLOWERS = (req, res) => {
  let userId = req.params.userId

  Follows.GET_FOLLOWERS(userId)
    .then(followers => {
      res.status(200).send(followers)
    })
}

followsController.DELETE_FOLLOWER = (req, res) => {
  let userId = req.params.userId
  let followerId = req.body.followerId

  Follows.DELETE_FOLLOWER(userId, followerId)
    .then(numDeleted => {
      res.status(200).send('Deleted follower')
    })
}

followsController.GET_FOLLOWING = (req, res) => {
  let userId = req.params.userId

  Follows.GET_FOLLOWING(userId)
    .then(followedUsers => {
      res.status(200).send(followedUsers)
    })
}

followsController.POST_FOLLOWING = (req, res) => {
  let followedUsername = req.body.followedUsername
  let userId = req.params.userId

  Follows.POST_FOLLOWING(followedUsername, userId)
    .then(followStatus => {
      res.status(200).send(followStatus)
    })
}

module.exports = followsController
