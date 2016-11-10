let Users = require('../db').Users
let Teams = require('../db').Teams
let UsersTeams = require('../db').UsersTeams
let teamsModel = {}

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
  return Teams.findOne({
    where: {
      id: teamId
    }
  })
  .then(team => {
    return team
  })
}

teamsModel.DELETE_TEAM = (userId, teamId) => {
  return Teams.findOne({
    where: {
      id: teamId
    }
  })
  .then(team => {
    return team.destroy()
      .then(status => {
        return 'Team successfully deleted'
      })
  })
}

teamsModel.ADD_ADMIN = (userId, teamId, idToAdd) => {
  return UsersTeams.create({
    userId: idToAdd,
    teamId: teamId,
    isAdmin: false
  })
  .then(result => {
    return result
  })
}

teamsModel.REMOVE_ADMIN = (userId, teamId, idToRemove) => {
  return UsersTeams.findOne({
    where: {
      userId: idToRemove,
      isAdmin: true
    }
  })
  .then(result => {
    result.destroy()
    return 'Successfully removed admin'
  })
}

teamsModel.ADD_MEMBER = (userId, teamId, idToAdd) => {
  return UsersTeams.create({
    userId: idToAdd,
    teamId: teamId,
    isAdmin: false
  })
  .then(result => {
    return result
  })
}

teamsModel.REMOVE_MEMBER = (userId, teamId, idToRemove) => {
  return UsersTeams.findOne({
    where: {
      userId: idToRemove,
      isAdmin: false
    }
  })
  .then(result => {
    result.destroy()
    return 'Successfully removed member'
  })
}

teamsModel.GET_TEAM_PROJECTS = (userId, teamId) => {
  Projects.findAll({
    where: {
      teamId: teamId
    }
  })
  .then(projects => {
    return projects
  })
}

module.exports = teamsModel
