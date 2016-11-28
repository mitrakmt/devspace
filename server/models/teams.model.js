let Users = require('../db').Users
let Teams = require('../db').Teams
let Projects = require('../db').Projects
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
  return Teams.find({
    where: {
      name: teamName
    }
  })
  .then(team => {
    if (!team) {
      return Teams.create({
        name: teamName,
        description: teamDescription,
        owner: userId
      })
      .then(team => {
        return UsersTeams.create({
          isAdmin: true,
          teamId: team.id,
          userId: userId
        })
        .then(() => {
          return team
        })
      })
    } else {
      return { err: 'Team already exists'}
    }
  })
  .catch(err => {
    return err
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
        Projects.destroy({
          where: {
            teamId: teamId
          }
        }
        return 'Team successfully deleted'
      })
  })
}

teamsModel.ADD_ADMIN = (userId, teamId, idToAdd) => {
  return UsersTeams.create({
    userId: idToAdd,
    teamId: teamId,
    isAdmin: true
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
    if (result) {
      result.destroy()
      return 'Successfully removed member'
    } else {
      return 'Bad request'
    }
  })
}

teamsModel.GET_TEAM_PROJECTS = (userId, teamId) => {
  return Projects.findAll({
    where: {
      teamId: teamId
    }
  })
  .then(projects => {
    return projects
  })
}

// teamsModel.DELETE_TEAM_PROJECTS = (userId, teamId) => {
//   console.log(userId, teamId, 'userId, teamId')
//   return Projects.destroy({
//     where: {
//       teamId: teamId
//     },
//     force: true
//   })
//   .then(projects => {
//     console.log('projects', projects)
//     return 'Deleted team projects'
//   })
// }

teamsModel.GET_TEAM_MEMBERS = (teamId) => {
  return Teams.find({
    where: {
      id: teamId
    }
  })
  .then(teams => {
    return teams.getUsers()
  })
}

teamsModel.GET_TEAM_PROJECT_FROM_DB = (projectId) => {
  return Projects.findOne({
    where: {
      id: projectId
    },
    include: [{
      model: Teams
    }],
  })
  .then(project => {
    return project
  })
}

module.exports = teamsModel
