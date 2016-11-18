let Follows = require('../models').followsModel
let Users = require('../db').Users
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
    .then(follows => {
      let promises = follows.map(follow => {
        return new Promise((resolve, reject) => {
          Users.findAll({
            where: {
              id: follow.userId
            }
          })
          .then(users => {
            resolve(users)
          })
          .catch(err => {
            reject(err)
          })
        })
      })

      Promise.all(promises)
        .then(followedUsers => {
          followedUsers = [].concat.apply([], followedUsers)
          res.status(200).send(followedUsers)
        })
        .catch(err => {
          res.status(204).send({err: err})
        })
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
