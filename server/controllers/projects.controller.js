let projectsController = {}

projectsController.GET_PROJECTS = (req, res) => {
  let userId = req.headers['userId']
  // userId
}

projectsController.GET_PROJECT = (req, res) => {
  let userId = req.headers['userId']
  // userId, username/repoName in req url
}

projectsController.UPDATE_PROJECT = (req, res) => {
  let userId = req.headers['userId']
  // userId, content to update, and username/repoName in req url
}

projectsController.DELETE_PROJECT = (req, res) => {
  let userId = req.headers['userId']
  // userId, username/repoName in req url
}

module.exports = projectsController
