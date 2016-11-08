let projectsModel = {}
let request = require('request-promise')
let _ = require('lodash')
let Users = require('../db').Users
let Projects = require('../db').Projects

projectsModel.CREATE_PROJECT = (userId, owner, name, url, description, githubId) => {
  Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    Projects.findOne({
      where: {
        name: name
      }
    }).then(result => {
      const users = user
      if (result) {
        users.setProjects(result, { isAdmin: true })
        return
      }
      console.log("Creating project of ", name)
      return Projects.create({
        name: name,
        owner: owner,
        description: description,
        url: url,
        githubId: githubId
      })
      .then(project => {
        users.setProjects(project, { isAdmin: true })
        return project
      })
    })
  })
}

projectsModel.GET_PROJECTS = (userId, username) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return user.getProjects({})
      .then(projects => {
        if (projects[0] === undefined) {
          let options = {
            url: 'https://api.github.com/users/' + username + '/repos?sort=updated',
            type: 'owner',
            headers: {
              'User-Agent': username
            }
          }
          return request(options, function (error, response, body) {
            return JSON.parse(body)
          })
          .then(projects => {
            let finalProjects = JSON.parse(projects).slice(0, 9)
            console.log(finalProjects)

            _.each(finalProjects, (singleProject) => {
              projectsModel.CREATE_PROJECT(userId, singleProject.owner.login, singleProject.name, singleProject.url, singleProject.description, singleProject.id)
            })
          })
        } else {
          return projects
        }
      })
  })
}

projectsModel.GET_PROJECT = (userId, projectId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    user.getProjects({
      where: {
        projectId: projectId
      }
    })
    .then(project => {
      return project || false
    })
  })
}

projectsModel.UPDATE_PROJECT = (userId, projectId) => {
  Projects.findOne({
    where: {
      id: projectId
    }
  })
  .then(project => {
    project.update({
      // info to update
    })
  })
}

projectsModel.DELETE_PROJECT = (userId, projectId) => {
  Users.findOne()
  .then(project => {
    project.destroy()
      .then(status => {
        return 'Project successfully deleted'
      })
  })
}

projectsModel.ADD_ADMIN = (userId, projectId) => {
  Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    Projects.findOne({
      where: {
        id: projectId
      }
    })
    .then(project => {
      user.setProjects(project, { isAdmin: true })
    })
  })
}

projectsModel.ADD_MEMBER = (userId, projectId) => {
  Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    Projects.findOne({
      where: {
        id: projectId
      }
    })
    .then(project => {
      user.setProjects(project, { isAdmin: false })
    })
  })
}

module.exports = projectsModel
