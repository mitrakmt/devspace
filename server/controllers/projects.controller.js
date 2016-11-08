let projectsController = {}
let Projects = require('../models').Projects

projectsController.GET_PROJECTS = (req, res) => {
  let userId = req.headers['userid']

  // Projects.GET_PROJECTS(userId)
}

projectsController.GET_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let username = req.params.username
  let projectName = req.params.projectName

  // Projects.GET_PROJECT(userId, username, projectName)
}

projectsController.UPDATE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let username = req.params.username
  let projectName = req.params.projectName

  // Projects.UPDATE_PROJECT(userId, content, username, projectName)
}

projectsController.DELETE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let username = req.params.username
  let projectName = req.params.projectName

  // Projects.DELETE_PROJECT(userId, username, projectName)
}

module.exports = projectsController


// ----------- REDO ------------
