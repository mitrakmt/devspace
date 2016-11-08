let teamsRouter = require('express').Router()
const teamsController = require('../controllers').teamsController

teamsRouter.route('/')
  .get(teamsController.GET_TEAMS)
    // Requires userId
  .post(teamsController.CREATE_TEAM)
    // Requires userId, team information (name, description, other admins by email)

teamsRouter.route('/:teamId')
  .get(teamsController.GET_TEAM)
    // Requires userId, teamId
  .delete(teamsController.DELETE_TEAM)
    // Requires userId, teamId

teamsRouter.route('/:teamId/admin')
  .post(teamsController.ADD_ADMIN)
    // Requires userId header, teamId in req url, idToAdd to add in req.body
  .delete(teamsController.REMOVE_ADMIN)
    // Requires userId header, teamId in req url, idToRemove to delete in req.body

teamsRouter.route('/:teamId/member')
  .post(teamsController.ADD_MEMBER)
    // Requires userId header, teamId in req url, idToAdd in req.body
  .delete(teamsController.REMOVE_ADMIN)
    // Requires userId header, teamId in req url, idToRemove to remove in req.body

module.exports = teamsRouter
