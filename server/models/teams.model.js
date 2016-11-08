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

teamsModel.ADD_ADMIN = (userId, teamId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return Teams.findOne({
      where: {
        id: teamId
      }
    })
    .then(team => {
      return user.setProjects(team, { isAdmin: true })
        .then(status => {
          return status
        })
    })
  })
}

teamsModel.REMOVE_ADMIN = (userId, teamId, idToDelete) => {

}

teamsModel.ADD_MEMBER = (userId, teamId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return Teams.findOne({
      where: {
        id: teamId
      }
    })
    .then(team => {
      return user.setTeams(team, { isAdmin: false })
        .then(status => {
          return status
        })
    })
  })
}

// teamsModel.REMOVE_MEMBER = (userId, teamId) => {
//   Users.findOne({
//     where: {
//       id: userId
//     }
//   })
//   .then(user => {
//     Teams.findOne({
//       where: {
//         id: teamId
//       }
//     })
//     .then(team => {
//       user.setTeams(team, { isAdmin: false })
//     })
//   })
// }

module.exports = teamsModel
