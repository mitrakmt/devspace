let Projects = require('../models').projectsModel
let Users = require('../db').Users
let projectsController = {}

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

  Projects.CREATE_PROJECT(userId, owner, name, url, description)
    .then(project => {
      res.status(200).send(project)
    })
}

projectsController.GET_PROJECT_FROM_DB = (req, res) => {
  let userId = req.headers['userid']
  let projectId = req.params.projectId

  Projects.GET_PROJECT_FROM_DB(userId, projectId)
    .then(project => {
      res.status(200).send(project)
    })
}

projectsController.UPDATE_PROJECT = (req, res) => {
  let userId = req.headers['userid']
  let deadline = req.body.deadline
  let projectId = req.params.projectId
  let projectName = req.params.projectName
  let url = req.body.url
  let projectDataToUpdate = {
    deadline: deadline,
    projectName: projectName,
    url: url
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
  let username = req.headers['username']
  let repo = req.headers['repo']

  Projects.GET_COMMITS(username, repo)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.GET_BRANCHES = (req, res) => {
  let username = req.headers['username']
  let repo = req.headers['repo']

  Projects.GET_BRANCHES(username, repo)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.GET_README = (req, res) => {
  let username = req.headers['username']
  let repo = req.headers['repo']

  Projects.GET_README(username, repo)
    .then(result => {
      res.status(200).send(result)
    })
}

projectsController.GET_FORKS = (req, res) => {
  let username = req.headers['username']
  let repo = req.headers['repo']

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
}

projectsController.GET_CONTRIBUTORS = (req, res) => {
  let username = req.headers['username']
  let repo = req.headers['repo']

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
}

projectsController.GET_LANGUAGES = (req, res) => {
  let username = req.headers['username']
  let repo = req.headers['repo']

  Projects.GET_LANGUAGES(username, repo)
    .then(results => {
      res.status(200).send(results)
    })
}

module.exports = projectsController
