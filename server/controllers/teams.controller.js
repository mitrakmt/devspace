let Teams = require('../models').teamsModel
let teamsController = {}

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
  let idToAdd = req.body.idToAdd

  Teams.DELETE_TEAM(userId, teamId)
}

teamsController.ADD_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let idToAdd = req.body.idToAdd

  Teams.ADD_ADMIN(userId, teamId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

teamsController.REMOVE_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let idToRemove = req.body.idToRemove

  Teams.REMOVE_ADMIN(userId, teamId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

teamsController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let idToAdd = req.body.idToAdd

  Teams.ADD_MEMBER(userId, teamId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

teamsController.REMOVE_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let idToRemove = req.body.idToRemove

  Teams.REMOVE_MEMBER(userId, teamId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

teamsController.GET_TEAM_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId

  Teams.GET_TEAM_PROJECTS(userId, teamId)
    .then(projects => {
      res.status(200).send(projects)
    })
}

module.exports = teamsController
