const Follows = require('../db').Follows
const Users = require('../db').Users
const followsModel = {}

followsModel.GET_FOLLOWERS = (userId) => {
  return Follows.findAll({
    where: {
      userId: userId
    }
  })
}

followsModel.DELETE_FOLLOWER = (userId, followerId) => {
  return Follows.findOne({
    where: {
      userId: userId,
      followerId: followerId
    }
  })
  .then(follow => {
    if (!follow) {
      return 'Bad request'
    }
    follow.destroy()
    return 'Follower successfully deleted'
  })
}

followsModel.GET_FOLLOWING = (userId) => {
  return Follows.findAll({
    where: {
      followerId: userId
    }
  })
}

followsModel.POST_FOLLOWING = (userId, followerId) => {
  return Follows.findOne({
    where: {
      userId: userId,
      followerId: followerId
    }
  })
  .then(follow => {
    if (follow === null) {
      return Follows.create({
        userId: userId,
        followerId: followerId
      })
      .then(follow => {
        Users.findOne({
          where: {
            id: follow.userId
          }
        })
        .then(user => {
          user.increment('followerCount')
        })

        Users.findOne({
          where: {
            id: follow.followerId
          }
        })
        .then(user => {
          user.increment('followingCount')
        })
      })
    } else {
      Users.findOne({
        where: {
          id: follow.followerId
        }
      })
      .then(user => {
        user.decrement('followingCount')
      })
      follow.destroy()
      return 'Deleted follow'
    }
  })
  .catch(err => {
    console.log('err in follow/unfollow', err)
  })
}

module.exports = followsModel
