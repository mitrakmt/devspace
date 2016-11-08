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

module.exports = teamsRouter
