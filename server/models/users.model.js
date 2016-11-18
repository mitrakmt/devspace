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

usersModel.GET_USER_PROFILE_FEED = (username, userId) => {
  return Users.findOne({
    where: {
      'username': username
    }
  })
  .then(user => {
    if (user) {
      return Follows.findAll({
        where: {
          followerId: user.id
        }
      })
      .then(follows => {
        let promises = follows.map(follow => {
          return new Promise((resolve, reject) => {
            Posts.findAll({
              where: {
                userId: follow.userId
              },
              include: [{
                all: true
              }],
              order: [
                ['createdAt', 'DESC']
              ]
            })
            .then(posts => {
              resolve(posts)
            })
            .catch(err => {
              reject(err)
            })
          })
        })

        return Promise.all(promises)
          .then(postArrs => {
            let result = postArrs.map(postArr => {
              return postArr.map(postObj => {
                return postObj
              })
            })
            let mergedPosts = [].concat.apply([], result)
            return mergedPosts
          })
          .catch(postArrs => {
            return false
          })
      })
    } else {
      return false
    }
  })
}

module.exports = usersModel
