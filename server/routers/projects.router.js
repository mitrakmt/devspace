let projectsRouter = require('express').Router()
const projectsController = require('../controllers').projectsController

projectsRouter.route('/')
  .get(projectsController.GET_PROJECTS)
    // Requires userId

projectsRouter.route('/:username/:repoName')
  .get(projectsController.GET_PROJECT)
    // Requires userId, and username/repoName in request URL
  .put(projectsController.UPDATE_PROJECT)
    // Requires userId, content to update, and username/repoName in request URL
  .delete(projectsController.DELETE_PROJECT)
    // Requires  userId, and username/repoName in request URL

module.exports = projectsRouter
