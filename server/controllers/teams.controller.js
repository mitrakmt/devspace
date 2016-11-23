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
  let idToRemove = req.headers['idtoremove']

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

teamsController.GET_ALL_BRANCHES = (req, res) => {
  let userId
  let teamId = +req.params['teamId']
  let projectId = +req.headers['projectid']
  let teamName

  Teams.GET_TEAM(userId, teamId)
    .then(team => {
      teamName = team.name
      console.log('teamName', teamName)
      return teamName
    })
    .then(teamName => {
      Projects.GET_PROJECT_FROM_DB(projectId)
      .then(project => {
        let repo = project['name']
        console.log('repo', repo)
        Projects.GET_CONTRIBUTORS(teamName, repo)
        .then(contributors => {
          return JSON.parse(contributors)
        })
        .then(contributors => {
          let promises = contributors.map(contributor => {
            return new Promise((resolve, reject) => {
              Projects.GET_BRANCHES(contributor.login, repo)
              .then(branches => {
                resolve(branches)
              })
              .catch(err => {
                reject(err)
              })
            })
          })
          return promises
        })
        .then(promises => {
          Promise.all(promises)
          .then(results => {
            let mergedBranches = []
            results = results.map(result => {
              mergedBranches.push(JSON.parse(result))
            })
            mergedBranches = [].concat.apply([], mergedBranches)
            res.status(200).send(mergedBranches)
          })
          .catch(err => {
            res.send({err: err})
          })
        })
      })
    })
}

teamsController.GET_COMMIT_FREQ = (req, res) => {
  let userId = req.headers['userid']
  let teamId = req.params.teamId
  let teamProjects
  let teamName
  Teams.GET_TEAM(userId, teamId)
    .then(team => {
      teamName = team.dataValues.name
      return teamName
    })
    .then(team => {
      return Teams.GET_TEAM_PROJECTS(userId, teamId)
        .then(projects => {
          teamProjects = projects
          return teamProjects
        })
    })
    .then(teamProjects => {
      if (teamProjects.length > 0) {
        let promises = teamProjects.map(project => {
          return new Promise((resolve, reject) => {
            Projects.GET_COMMITS(teamName, project.name, 'master')
              .then(commits => {
                resolve(commits)
              })
              .catch(err => {
                reject(err)
              })
          })
        })

        Promise.all(promises)
          .then(results => {
            let mergedCommits = []
            results = results.map(result => {
              mergedCommits.push(JSON.parse(result))
            })
            // github returns most recent 60 commits
            mergedCommits = [].concat.apply([], mergedCommits)

            var mostRecentCommit = {};
            var commitHour = {};
            var commitDay = {};

            mergedCommits.forEach(commit => {
              var date = new Date(commit.commit.author.date)
              var hour = date.getUTCHours().toString()
              var day = date.getUTCDay().toString()
              if (!mostRecentCommit[commit.author.login]) {
                mostRecentCommit[commit.author.login] = { message: commit.commit.message, date: commit.commit.author.date };
                commitDay[commit.author.login] = {
                  0: 0,
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0
                }
                commitHour[commit.author.login] = {
                  0: 0,
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0,
                  7: 0,
                  8: 0,
                  9: 0,
                  10: 0,
                  11: 0,
                  12: 0,
                  13: 0,
                  14: 0,
                  15: 0,
                  16: 0,
                  17: 0,
                  18: 0,
                  19: 0,
                  20: 0,
                  21: 0,
                  22: 0,
                  23: 0
                }
                commitDay[commit.author.login][day] = 1;
                commitHour[commit.author.login][hour] = 1;
              } else {
                commitDay[commit.author.login][day]++
                commitHour[commit.author.login][hour]++
              }
            })
            let commitBundle = {mostRecentCommit: mostRecentCommit, commitDay: commitDay, commitHour: commitHour}
            res.status(200).send(commitBundle)
          })
          .catch(err => {
            res.send({err: err})
          })
      } else {
        res.send({err: 'No projects found'})
      }
    })
}
module.exports = teamsController
