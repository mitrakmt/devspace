let teamsController = {}
let Teams = require('../models').teamsModel

teamsController.GET_TEAMS = (req, res) => {
  let userId = req.headers['userid']

  Teams.GET_TEAMS(userId)
}

teamsController.CREATE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamName = req.body.teamName
  let teamDescription = req.body.teamDescription
  let teamAdmins = req.body.teamAdmins

  Teams.CREATE_TEAM(userId, teamName, teamDescription, teamAdmins)
}

teamsController.GET_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId

  Teams.GET_TEAM(userId, teamId)
}

teamsController.DELETE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId

  Teams.DELETE_TEAM(userId, teamId)
}

teamsController.ADD_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.body.teamId

  Teams.ADD_ADMIN(userId, teamId)
    .then(result => {
      res.status(200).send(result)
    })
}

teamsController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.body.teamId

  Teams.ADD_MEMBER(userId, teamId)
    .then(result => {
      res.status(200).send(result)
    })
}

module.exports = teamsController
