let projectsModel = {}
let request = require('request-promise')
let _ = require('lodash')
let Users = require('../db').Users
let Projects = require('../db').Projects
let UsersProjects = require('../db').UsersProjects

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
      return Projects.create({
        name: name,
        owner: owner,
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

projectsModel.ADD_ADMIN = (userId, projectId, idToAdd) => {
  return UsersProjects.create({
    userId: idToAdd,
    projectId: projectId,
    isAdmin: false
  })
  .then(result => {
    return result
  })
}

projectsModel.REMOVE_ADMIN = (userId, projectId, idToRemove) => {
  return UsersProjects.findOne({
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

projectsModel.ADD_MEMBER = (userId, projectId, idToAdd) => {
  return UsersProjects.create({
    userId: idToAdd,
    projectId: projectId,
    isAdmin: false
  })
  .then(result => {
    return result
  })
}

projectsModel.REMOVE_MEMBER = (userId, projectId, idToRemove) => {
  return UsersProjects.findOne({
    where: {
      userId: idToRemove,
      isAdmin: false
    }
  })
  .then(result => {
    result.destroy()
    return 'Successfully removed admin'
  })
}

module.exports = projectsModel
