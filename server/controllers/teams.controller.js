let Teams = require('../models').teamsModel
let Projects = require('../models').projectsModel
let Users = require('../db').Users
let teamsController = {}

teamsController.GET_TEAMS = (req, res) => {
  let userId = req.headers['userid']

  Teams.GET_TEAMS(userId)
    .then(teams => {
      res.status(200).send(teams)
    })
}

teamsController.CREATE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamName = req.body.teamName
  let teamDescription = req.body.teamDescription
  let teamAdmins = req.body.teamAdmins

  Teams.CREATE_TEAM(userId, teamName, teamDescription, teamAdmins)
    .then(team => {
      res.status(200).send(team)
    })
}

teamsController.GET_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId

  Teams.GET_TEAM(userId, teamId)
    .then(team => {
      res.status(200).send(team)
    })
}

teamsController.DELETE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let idToAdd = req.body.idToAdd

  Teams.DELETE_TEAM(userId, teamId)
    .then(team => {
      res.status(200).send(team)
    })
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
  //let idToAdd = req.body.idToAdd
  let username = req.body.username

  Users.findOne({
    where: {
      username: username
    }
  })
  .then(userToAdd => {
    let idToAdd = userToAdd.id
    Teams.ADD_MEMBER(userId, teamId, idToAdd)
      .then(result => {
        res.status(200).send(result)
      })
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

teamsController.ADD_PROJECT_TO_TEAM = (req, res) => {
  let projectId = req.headers['projectid']
  let teamId = req.params.teamId

  Teams.ADD_PROJECT_TO_TEAM(projectId, teamId)
    .then(projects => {
      res.status(200).send(projects)
    })
}

teamsController.GET_TEAM_MEMBERS = (req, res) => {
  let teamId = req.params.teamId

  Teams.GET_TEAM_MEMBERS(teamId)
    .then(members => {
      res.status(200).send(members)
    })
}

teamsController.GET_TEAM_CONTRIBUTIONS = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let teamProjects
  let teamName
  Teams.GET_TEAM(userId, teamId)
    .then(team => {
      teamName = team.name
      return team
    })
    .then(team => {
      return Teams.GET_TEAM_PROJECTS(userId, teamId)
        .then(projects => {
          teamProjects = projects
          return teamProjects
        })
    })
    .then(teamProjects => {
      let promises = teamProjects.map(project => {
        return new Promise((resolve, reject) => {
          Projects.GET_CONTRIBUTORS(teamName, project.name)
            .then(contributors => {
              resolve(contributors)
            })
            .catch(err => {
              reject(err)
            })
        })
      })
      Promise.all(promises)
        .then(results => {
          let mergedContributors = []
          results = results.map(result => {
            mergedContributors.push(JSON.parse(result))
          })
          mergedContributors = [].concat.apply([], mergedContributors)
          res.status(200).send(mergedContributors)
        })
        .catch(err => {
          res.send({err: err})
        })
    })
}

// teamsController.GET_ALL_BRANCHES = (req, res) => {
//   let teamId = req.params['teamId']
// }
module.exports = teamsController
