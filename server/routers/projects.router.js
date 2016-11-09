let projectsRouter = require('express').Router()
const projectsController = require('../controllers').projectsController

projectsRouter.route('/')
  .get(projectsController.GET_PROJECTS)    // works but should res the projects
    // Requires userId and github username in header

projectsRouter.route('/:projectId')
  .get(projectsController.GET_PROJECT)    // doesn't work
    // Requires userId, and username/repoName in request URL
  .put(projectsController.UPDATE_PROJECT)    // Can't test yet
    // Requires userId, content to update (name, owner, url, or/and deadline), and username/repoName in request URL
  .delete(projectsController.DELETE_PROJECT)   // Can't test yet
    // Requires  userId, and username/repoName in request URL

projectsRouter.route('/:projectId/admin')
  .post(projectsController.ADD_ADMIN)   // works
    // Requires userId header, projectId in req url, idToAdd in req.body
  .delete(projectsController.REMOVE_ADMIN)
    // Requires userId header, projectId in req url, idToRemove in req.body

projectsRouter.route('/:projectId/member')
  .post(projectsController.ADD_MEMBER)
    // Requires userId header, projectId in req url, idToAdd in req.body
  .delete(projectsController.REMOVE_MEMBER)
    // Requires userId header, projectId in req url, idToRemove in req.body

module.exports = projectsRouter
