let teamsRouter = require('express').Router()
const teamsController = require('../controllers').teamsController

teamsRouter.route('/')
  .get(teamsController.GET_TEAMS)
    // Requires userId
  .post(teamsController.CREATE_TEAM)
    // Requires userId, and optional arguments in body of teamName, teamDescription, or teamAdmins

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
  .get(teamsController.GET_TEAM_MEMBERS)
  .post(teamsController.ADD_MEMBER)
    // Requires userId header, teamId in req url, idToAdd in req.body
  .delete(teamsController.REMOVE_MEMBER)
    // Requires userId header, teamId in req url, idToRemove to remove in req.body

teamsRouter.route('/:teamId/projects')
  .get(teamsController.GET_TEAM_PROJECTS)
    // Requires userId header, teamId in reql url

teamsRouter.route('/:teamId/contributions')
  .get(teamsController.GET_TEAM_CONTRIBUTIONS)

teamsRouter.route('/:teamId/branches')
  .get(teamsController.GET_ALL_BRANCHES)

module.exports = teamsRouter



// add team to a company
// add project to a team
//
