let Projects = require('../models').projectsModel
let Users = require('../db').Users
let projectsController = {}
let showdown  = require('showdown')
let converter = new showdown.Converter()

projectsController.GET_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  let username = req.headers['username']

  Projects.GET_PROJECTS(userId)
    .then(projects => {
      res.status(200).send(projects)
    })
}

projectsController.CREATE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let owner = userId
  let name = req.body.name
  let url = req.body.url || null
  let description = req.body.description
  let teamId = req.body.teamId
  if (name) {
    Projects.CREATE_PROJECT(userId, owner, name, url, description, teamId)
      .then(project => {
        res.status(200).send(project)
      })
  } else {
    res.status(400).send({ err: 'Invalid project name' })
  }
}

projectsController.GET_PROJECT_FROM_DB = (req, res) => {
  let projectId = req.params.projectId

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      res.status(200).send(project)
    })
}

projectsController.UPDATE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let deadline = req.body.deadline
  let projectId = req.params.projectId
  let projectName = req.body.projectName
  let teamId = req.body.teamId

  let url = req.body.url
  let projectDataToUpdate = {
    deadline: deadline,
    projectName: projectName,
    url: url,
    teamId: teamId
  }

  Projects.UPDATE_PROJECT(userId, projectId, projectDataToUpdate)
    .then(project => {
      res.status(200).send(project)
    })
}

// project timeline activity over timepsan

projectsController.DELETE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId

  Projects.DELETE_PROJECT(userId, projectId)
    .then(status => {
      res.status(200).send(status)
    })
}

projectsController.ADD_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToAdd = req.body.idToAdd

  Projects.ADD_ADMIN(userId, projectId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.REMOVE_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToRemove = req.body.idToRemove

  Projects.REMOVE_ADMIN(userId, projectId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToAdd = req.body.idToAdd

  Projects.ADD_MEMBER(userId, projectId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.REMOVE_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId
  let idToRemove = req.body.idToRemove

  Projects.REMOVE_MEMBER(userId, projectId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.GET_COMMITS = (req, res) => {
  let projectId = req.params['projectId']
  let branch = req.headers['branch']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_COMMITS(username, repo, branch)
        .then(data => {
          let commits = JSON.parse(data).map(commit => {
            return {
              sha: commit.sha,
              date: commit.commit.author.date,
              message: commit.commit.message,
              url: commit.html_url,
              username: commit.author.login
              // total: commit.stats.total,
              // additions: commit.stats.additions,
              // deletions: commit.stats.deletions
            }
          })
          res.status(200).send(commits)
        })
        .catch(err => {
          res.send({err: err})
        })
    })
}

projectsController.GET_BRANCHES = (req, res) => {
  let projectId = req.params['projectId']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_BRANCHES(username, repo)
        .then(branches => {
          let shas = JSON.parse(branches).map(branch => {
            return {
              sha: branch.commit.sha,
              name: branch.name,
              url: branch.commit.url
            }
          })
          res.status(200).send(shas)
        })
        .catch(err => {
          res.send({err: err})
        })
    })
    .catch(err => {
      res.send({err: err})
    })
}

projectsController.GET_README = (req, res) => {
  let projectId = req.params['projectId']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_README(username, repo)
        .then(result => {
          let resultHTML = converter.makeHtml(result)
          res.status(200).send(resultHTML)
        })
    })
}

projectsController.GET_FORKS = (req, res) => {
  let projectId = req.params['projectId']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_FORKS(username, repo)
        .then(results => {
          let forks = (JSON.parse(results)).map(result => {
            return {
              owner: result.owner.login,
              html_url: result.html_url
            }
          })
          res.status(200).send(forks)
        })
    })
}

projectsController.GET_CONTRIBUTORS = (req, res) => {
  let projectId = req.params['projectId']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_CONTRIBUTORS(username, repo)
        .then(results => {
          let contributors = (JSON.parse(results)).map(result => {
            return {
              login: result.login,
              avatar: result.avatar_url,
              contributions: result.contributions
            }
          })
          res.status(200).send(contributors)
        })
    })
}

projectsController.GET_LANGUAGES = (req, res) => {
  let projectId = req.params['projectId']

  Projects.GET_PROJECT_FROM_DB(projectId)
    .then(project => {
      let username = project.users[0].username
      let repo = project['name']

      Projects.GET_LANGUAGES(username, repo)
        .then(results => {
          results = JSON.parse(results)
          let langs = []
          if (Object.keys(results).length > 0) {
            for (var key in results) {
              langs.push({language: [key, results[key]]})
            }
          }
          res.status(200).send(langs)
        })
    })
}

module.exports = projectsController
