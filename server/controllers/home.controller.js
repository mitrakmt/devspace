let Home = require('../models').homeModel
let Projects = require('../models').projectsModel
let Posts = require('../db').Posts
let Follows = require('../db').Follows
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions
let Users = require('../db').Users
let request = require('request-promise')

let homeController = {}

homeController.GET_GITHUB_ACTIVITY = (req, res) => {
  let username = req.headers['username']

  Home.GET_RECEIVED_EVENTS(username)
    .then(events => {
      let result = (JSON.parse(events)).map(event => {
        if (event.type === 'ForkEvent') {
          return {
            type: event.type,
            action: event.payload.action,
            username: event.actor.login,
            repo: event.repo.name,
            repo_url: event.repo.url,
            avatar: event.actor.avatar_url,
            url: event.payload.forkee.html_url,
            description: event.payload.forkee.description,
            created_at: event.created_at
          }
        } else if (event.type === 'CreateEvent') {
          return {
            type: event.type,
            action: event.payload.action,
            username: event.actor.login,
            repo: event.repo.name,
            repo_url: event.repo.url,
            avatar: event.actor.avatar_url,
            url: null,
            description: event.payload.description,
            created_at: event.created_at
          }
        } else {
          return {
            type: event.type,
            action: event.payload.action,
            username: event.actor.login,
            repo: event.repo.name,
            repo_url: event.repo.url,
            avatar: event.actor.avatar_url,
            url: null,
            description: null,
            created_at: event.created_at
          }
        }
      })
      res.status(200).send(result)
    })
}

homeController.SEARCH_USERS = (req, res) => {
  let searchTerm = req.params.searchTerm
  let username = req.headers['username']
  let options = {
    url: `https://api.github.com/users/${searchTerm}`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
    .then(user => {
      let parsedUsers = JSON.parse(user)
      res.status(200).send(parsedUsers)
    })
    .catch(err => {
      return `Err in getting user profile`
    })
}

homeController.GET_CURR_USER_FEED = (req, res) => {
  let userId = req.headers['userid']
  
  Follows.findAll({
    where: {
      followerId: userId
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
          // console.log("POSTS INSIDE HOME CONTROLLER GET CURR FEED +++++++++>", posts)
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        })
      })
    })

    Promise.all(promises)
      .then(postArrs => {
        // console.log("POSTS ARRS INSIDE HOME CONTROLLER GET CURR FEED PROMISE ALL+++++++++>", postArrs[0].interactions)
        let result = postArrs.map(postArr => {
          return postArr.map(postObj => {
            return postObj
          })
        })
        let mergedPosts = [].concat.apply([], result)
        console.log("POSTS INSIDE HOME CONTROLLER GET CURR FEED AFTER MERGE +++++++++>", mergedPosts[0].interactions)
        res.status(200).send(mergedPosts)
      })
      .catch(postArrs => {
        res.status(204).send(postArrs)
      })
  })
}

homeController.GET_PROJECT_SIDEBAR = (req, res) => {
  let userId = req.headers['userid']

  Projects.GET_PROJECTS(userId)
    .then(projects => {
      res.status(200).send(projects)
    })
}

homeController.GET_FOLLOWED_USER_POSTS = (req, res) => {
  let userId = req.headers['userid']

  Follows.findAll({
    where: {
      followerId: userId
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
            model: Users
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

    Promise.all(promises)
      .then(postArrs => {
        let result = postArrs.map(postArr => {
          return postArr.map(postObj => {
            return postObj
          })
        })
        let mergedPosts = [].concat.apply([], result)
        res.status(200).send(mergedPosts)
      })
      .catch(postArrs => {
        res.status(204).send(postArrs)
      })
  })
}

homeController.GET_POST_COMMENTS = (req, res) => {
  let postId = req.params['postId']

  Comments.findAll({
    where: {
      postId: postId
    },
    include: [{
      model: Users
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
  .then(comments => {
    console.log('comments', comments)
    res.status(200).send(comments)
  })
}

homeController.GET_POST_INTERACTIONS = (req, res) => {
  let postId = req.params['postId']

  Interactions.findAll({
    where: {
      postId: postId
    },
    include: [{
      model: Users
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
  .then(interactions => {
    res.status(200).send(interactions)
  })
}
module.exports = homeController
