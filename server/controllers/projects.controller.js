let projectsController = {}

projectsController.GET_PROJECTS = (req, res) => {
  // userId
}

projectsController.GET_PROJECT = (req, res) => {
  // userId, username/repoName in req url
}

projectsController.UPDATE_PROJECT = (req, res) => {
  // userId, content to update, and username/repoName in req url
}

projectsController.DELETE_PROJECT = (req, res) => {
  // userId, username/repoName in req url
}

module.exports = projectsController
