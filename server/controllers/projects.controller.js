let projectsController = {}
let Projects = require('../models').projectsModel
let Users = require('../db').Users

projectsController.GET_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  let username = req.headers['username']

  Projects.GET_PROJECTS(userId, username)
    .then(projects => {
      res.status(200).send(projects)
    })
}

projectsController.GET_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let username = req.params.username
  let repo = req.params.repo

  Projects.GET_PROJECT(userId, repo)
    .then(project => {
      if (!project) {
        Projects.CREATE_PROJECT(userId, repo)
          .then(project => {
            res.status(200).send(project)
          })
      } else {
        res.status(200).send(project)
      }
    })
}

projectsController.UPDATE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let username = req.params.username
  let projectId = req.body.projectId
  let projectName = req.params.projectName

  Projects.UPDATE_PROJECT(userId, projectId)
    .then(project => {

    })
}

projectsController.DELETE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.body.projectId

  Projects.DELETE_PROJECT(userId, projectId)
    .then(status => {
      return status
    })
}

module.exports = projectsController
