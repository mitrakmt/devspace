let Users = require('../db').Users
let Posts = require('../db').Posts
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions
let postsModel = {}

postsModel.CREATE_POST = (userId, content, paid, likes) => {
  return Posts.create({
    userId: userId,
    content: content,
    paid: paid,
    likes: likes
  })
  .then(post => {
    return Posts.findOne({
      where: {
        id: post.id
      },
      include: [{
        model: Users
      }]
    })
    .then(foundPost => {
      // console.log('++++foundpost!', foundPost)
      return foundPost
    })
  })
}

postsModel.UPDATE_POST = (userId, postId, content) => {
  return Posts.findOne({
    where: {
      id: postId,
      userId: userId
    }
  })
  .then(post => {
    if (!post) {
      return 'Bad request'
    }
    return post.update({
      content: content
    })
    .then(updatedPost => {
      return updatedPost
    })
  })
}

postsModel.DELETE_POST = (userId, postId) => {
  return Posts.findOne({
    where: {
      id: postId,
      userId: userId
    }
  })
  .then(post => {
    if (!post) {
      return 'Bad request'
    }
    console.log(post)
    post.destroy()
    console.log(post)
    return 'Post successfully deleted'
  })
}

postsModel.CREATE_COMMENT = (userId, postId, content, username) => {
  return Comments.create({
    userId: userId,
    postId: postId,
    content: content,
    username: username
  })
  .then(comment => {
    return comment
  })
}

postsModel.UPDATE_COMMENT = (userId, postId, commentId, content) => {
  return Comments.findOne({
    where: {
      id: commentId,
      userId: userId
    }
  })
  .then(comment => {
    if (!comment) {
      return 'Bad request'
    }
    return comment.update({
      content: content
    })
    .then(updatedComment => {
      return updatedComment
    })
  })
}

postsModel.DELETE_COMMENT = (userId, postId, commentId) => {
  return Comments.findOne({
    where: {
      id: commentId,
      userId: userId
    }
  })
  .then(comment => {
    comment.destroy()
    .then(secondstatus => {
      return 'Comment successfully deleted'
    })
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
          return post
        })
      })
    } else {
      return Posts.findOne({
        where: {
          id: postId
        }
      })
      .then(post => {
        post.decrement('likes')
        interaction.destroy()
        return post
      })
      .then(post => {
        return post
      })
    }
  })
}

module.exports = postsModel
