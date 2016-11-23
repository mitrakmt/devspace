let projectsModel = {}
let _ = require('lodash')
let request = require('request-promise')
let Projects = require('../db').Projects
let Users = require('../db').Users
let UsersProjects = require('../db').UsersProjects

projectsModel.CREATE_PROJECT = (userId, owner, name, url, description, teamId) => {
  return Projects.find({
    where: {
      owner: owner,
      name: name
    }
  })
  .then(project => {
    if (!project) {
      return Projects.create({
        owner: owner,
        name: name,
        url: url,
        description: description,
        teamId: teamId
      })
      .then(project => {
        return UsersProjects.create({
          isAdmin: true,
          projectId: project.id,
          userId: userId
        })
        .then(() => {
          return project
        })
      })
    } else {
      return { err: 'Project already exists' }
    }
  })
  .catch(err => {
    return err
  })

}

projectsModel.GET_PROJECTS = (userId) => {
  return UsersProjects.findAll({
    where: {
      userId: userId
    }
  })
  .then(projects => {
    let mappedProjects = _.map(projects, (project) => {
      return project.projectId
    })

    return Projects.findAll({
      where: {
        id: mappedProjects
      }
    })
    .then(projects => {
      return projects
    })
  })
}

projectsModel.GET_PROJECT_FROM_DB = (projectId) => {
  return Projects.findOne({
    where: {
      id: projectId
    },
    include: [{
      model: Users
    }],
  })
  .then(project => {
    return project
  })
}

projectsModel.UPDATE_PROJECT = (userId, projectId, projectDataToUpdate) => {
  let updatedProjectData = _.pickBy(projectDataToUpdate, (item) => {
    return !_.isUndefined(item)
  })

  return Projects.findOne({
    where: {
      id: projectId
    }
  })
  .then(project => {
    return project.update(
      updatedProjectData
    )
  })
  .then(result => {
    return result
  })
}

projectsModel.DELETE_PROJECT = (userId, projectId) => {
  return Projects.findOne({
    where: {
      id: projectId
    }
  })
  .then(project => {
    project.destroy()
    return 'Project successfully deleted'
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

projectsModel.GET_COMMITS = (username, repo, branch) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/commits?sha=${branch}`,
    headers: {
      'User-Agent': username
    }
  }
  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     return {
       title: 'Err in retrieving commits',
       err: err
     }
   })
}

projectsModel.GET_BRANCHES = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/branches`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

projectsModel.GET_README = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/readme`,
    headers: {
      'User-Agent': username,
      'Accept': 'application/vnd.github.v3.raw+json'
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

projectsModel.GET_FORKS = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/forks`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

projectsModel.GET_CONTRIBUTORS = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/contributors`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

projectsModel.GET_LANGUAGES = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/languages`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     result = JSON.parse(result)
     return result
   })
   .catch(err => {
     console.log("err", err)
   })
}

// MUST BE AUTHENTICATED
// 'api.github.com/users/:username/events/orgs/:org'

module.exports = projectsModel
