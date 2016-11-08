let usersModel = {}
let _ = require('lodash')
let Users = require('../db').Users
let Posts = require('../db').Posts
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions

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

  // do comments here

  return posts
}

module.exports = usersModel
