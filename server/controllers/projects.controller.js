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
  let projectId = req.body.projectId

  Projects.GET_PROJECT(userId, projectId)
    .then(project => {
      if (!project) {
        res.status(400).send('You can\'t access that project')
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

// project timeline activity over timepsan

projectsController.DELETE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.body.projectId

  Projects.DELETE_PROJECT(userId, projectId)
    .then(status => {
      return status
    })
}

projectsController.ADD_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToAdd = req.body.idToAdd

  Projects.ADD_ADMIN(userId, projectId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.REMOVE_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToRemove = req.body.idToRemove

  Projects.REMOVE_ADMIN(userId, projectId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToAdd = req.body.idToAdd

  Projects.ADD_MEMBER(userId, projectId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.REMOVE_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToRemove = req.body.idToRemove

  Projects.REMOVE_MEMBER(userId, projectId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

module.exports = projectsController
