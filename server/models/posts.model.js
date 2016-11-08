let postsModel = {}
let Users = require('../db').Users
let Posts = require('../db').Posts
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions

postsModel.CREATE_POST = (userId, content, paid, likes) => {
  return Posts.create({
    userId: userId,
    content: content,
    paid: paid,
    likes: likes
  })
  .then(post => {
    return post
  })
}

postsModel.UPDATE_POST = (userId, postId, content) => {
  return Posts.findOne({
    where: {
      id: postId
    }
  })
  .then(post => {
    post.update({
      content: content
    })
    .then(post => {
      return post
    })
  })
}

postsModel.DELETE_POST = (userId, postId) => {
  return Posts.findOne({
    where: {
      id: postId
    }
  })
  .then(post => {
    if (post.userId == userId) {
      Posts.destroy({
        where: {
          id: postId
        }
      })
      return 'Post successfully deleted'
    } else {
      return 'That\'s not your post to delete!'
    }
  })
}

postsModel.CREATE_COMMENT = (userId, postId, content) => {
  return Comments.create({
    userId: userId,
    postId: postId,
    content: content
  })
  .then(comment => {
    return comment
  })
}

postsModel.UPDATE_INTERACTION = (userId, postId) => {
  return Interactions.findOne({
    where: {
      userId: userId,
      postId: postId
    }
  })
  .then(interaction => {
    if (interaction === null) {
      return Interactions.create({
        userId: userId,
        postId: postId
      })
      .then(interaction => {
        return Posts.findOne({
          where: {
            id: interaction.postId
          }
        })
        .then(post => {
          post.increment('likes')
        })
      })
    } else {
      return Posts.findOne({
        where: {
          id: interaction.postId
        }
      })
      .then(post => {
        post.decrement('likes')
      })
      .then(() => {
        interaction.destroy()
      })
    }
  })
}

module.exports = postsModel
