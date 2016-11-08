let teamsModel = {}
let Users = require('../db').Users
let Teams = require('../db').Teams

teamsModel.GET_TEAMS = (userId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return user.getTeams({})
      .then(teams => {
        return teams
      })
  })
}

teamsModel.CREATE_TEAM = (userId, teamName, teamDescription, teamAdmins) => {
  return Teams.create({
    name: teamName,
    description: teamDescription
  })
  .then(team => {
    team.setUsers(userId)
    return team
  })
}

teamsModel.GET_TEAM = (userId, teamId) => {
  Teams.findOne({
    where: {
      id: teamId
    }
  })
  .then(team => {
    return team
  })
}

teamsModel.DELETE_TEAM = (userId, teamId) => {
  Teams.findOne({
    where: {
      id: teamId
    }
  })
  .then(team => {
    team.destroy()
      .then(status => {
        return 'Team successfully deleted'
      })
  })
}

teamsModel.ADD_ADMIN = (userId, teamId) => {
  Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    Teams.findOne({
      where: {
        id: teamId
      }
    })
    .then(team => {
      user.setProjects(team, { isAdmin: true })
    })
  })
}

teamsModel.ADD_MEMBER = (userId, teamId) => {
  Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    Teams.findOne({
      where: {
        id: teamId
      }
    })
    .then(team => {
      user.setTeams(team, { isAdmin: false })
    })
  })
}

module.exports = teamsModel
