let _ = require('lodash')
let Users = require('../db').Users
let Follows = require('../db').Follows
let Posts = require('../db').Posts
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions
let usersModel = {}

usersModel.GET_POSTS = (userId) => {
  return Posts.findAll({
    where: {
      userId: userId
    }
  })
  .then(posts => {
    return posts
  })
}

usersModel.GET_COMMENTS_AND_INTERACTIONS = (userId, posts) => {
  let postIds = _.map(posts, (post) => {
    return post.id
  })

  Interactions.findAll({
    id: postIds
  })
  .then(interactions => {
    return interactions
  })

  Comments.findAll({
    id: postIds
  })
  .then(comments => {
    return comments
  })

  return posts
}

usersModel.EDIT = (userId, userInfo) => {
  let updatedUserInfo = _.pickBy(userInfo, (item) => {
    return !_.isUndefined(item)
  })

  return Users.findOne({
    where: {
      id: userInfo.userId
    }
  })
  .then(user => {
    return user.update(
      updatedUserInfo
    )
  })
  .then(result => {
    return result
  })
}

usersModel.DELETE_USER = (userId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return user.destroy()
      .then(status => {
        return 'User record deleted'
      })
  })
}

usersModel.GET_AVATAR = (username) => {
  return Users.findOne({
    where: {
      "username": username
    }
  })
  .then(user => {
    return user.imageUrl
  })
}

usersModel.GET_USER = (username) => {
  return Users.findOne({
    where: {
      username: username
    }
  })
  .then(user => {
    return user
  })
  .catch(err => {
    return { err: err }
  })
}

usersModel.GET_MEMBER_STATUS = (username) => {
  return Users.findOne({
    where: {
      username: username
    }
  })
  .then(user => {
    if (user) {
      return true
    }

    return false
  })
}

usersModel.GET_USER_PROFILE_FEED = (username, userId) => {
  return Users.findOne({
    where: {
      'username': username
    }
  })
  .then(user => {
    console.log("USERUSERUSER ------>", user)
    if (user == null) {
      return false
    } else {
      return Posts.findAll({
        where: {
          userId: user.id
        },
        include: [{
          all: true
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(posts => {
        return posts
      })
    }
  })
}

module.exports = usersModel
