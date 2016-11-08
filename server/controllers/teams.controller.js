let teamsController = {}

teamsController.GET_TEAMS = (req, res) => {
  let userId = req.headers['userId']
  // userId
}

teamsController.CREATE_TEAM = (req, res) => {
  let userId = req.headers['userId']
  // userId, team info (name, description, other admins by email)
}

teamsController.GET_TEAM_PROJECTS = (req, res) => {
  let userId = req.headers['userId']
  // userId, teamId
}

teamsController.GET_TEAM = (req, res) => {
  let userId = req.headers['userId']
  // userId, teamId
}

teamsController.DELETE_TEAM = (req, res) => {
  let userId = req.headers['userId']
  // userId, teamId
}

module.exports = teamsController
