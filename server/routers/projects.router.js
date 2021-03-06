let projectsRouter = require('express').Router()
const projectsController = require('../controllers').projectsController

projectsRouter.route('/')
  .get(projectsController.GET_PROJECTS)
    // Requires userId in header
  .post(projectsController.CREATE_PROJECT)
    // Requires userId, optional args of url and name

projectsRouter.route('/:projectId')
  .get(projectsController.GET_PROJECT_FROM_DB)
    // Requires userId, and username/repoName in request URL
  .put(projectsController.UPDATE_PROJECT)
    // Requires userId, content to update (name, owner, url, or/and deadline), and username/repoName in request URL
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

projectsRouter.route('/:projectId/commits')
  .get(projectsController.GET_COMMITS)
  // Requires username and repo name

projectsRouter.route('/:projectId/branches')
  .get(projectsController.GET_BRANCHES)
  // Requires username and repo name

projectsRouter.route('/:projectId/readme')
  .get(projectsController.GET_README)
  // Requires username and repo name

projectsRouter.route('/:projectId/forks')
  .get(projectsController.GET_FORKS)
  // Requires username and repo name

projectsRouter.route('/:projectId/contributors')
  .get(projectsController.GET_CONTRIBUTORS)
  // Requires username and repo name

projectsRouter.route('/:projectId/languages')
  .get(projectsController.GET_LANGUAGES)
  // Requires username and repo name

module.exports = projectsRouter
