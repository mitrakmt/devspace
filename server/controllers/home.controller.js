let Home = require('../models').homeModel
let Projects = require('../models').projectsModel
let Posts = require('../db').Posts
let Follows = require('../db').Follows
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

homeController.GET_USER_FEED = (req, res) => {
  let userId = req.headers['userid']

  Follows.findAll({
    where: {
      followerId: userId
    }
  })
  .then(follows => {
    let promises = follows.map(follow => {
      console.log('follow', follow.dataValues)
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
          console.log('posts', posts)
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        })
      })
    })

    Promise.all(promises)
      .then(postObjs => {
        res.status(200).send(postObjs)
      })
      .catch(postObjs => {
        res.status(204).send(postObjs)
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

module.exports = homeController
