let _ = require('lodash')
let Users = require('../db').Users
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
    console.log(interactions)
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

usersModel.GET_USER = (userId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return user
  })
  .catch(err => {
    return { err: err }
  })
}

module.exports = usersModel
