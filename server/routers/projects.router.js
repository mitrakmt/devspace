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

projectsRouter.route('/:projectId/admin')
  .post(projectsController.ADD_ADMIN)
    // Requires userId header, projectId in req url, idToAdd in req.body
  .delete(projectsController.REMOVE_ADMIN)
    // Requires userId header, projectId in req url, idToRemove in req.body

projectsRouter.route('/:projectId/member')
  .post(projectsController.ADD_MEMBER)
    // Requires userId header, projectId in req url, idToAdd in req.body
  .delete(projectsController.REMOVE_MEMBER)
    // Requires userId header, projectId in req url, idToRemove in req.body

module.exports = projectsRouter
