let teamsController = {}

teamsController.GET_TEAMS = (req, res) => {
  // userId
}

teamsController.CREATE_TEAM = (req, res) => {
  // userId, team info (name, description, other admins by email)
}

teamsController.GET_TEAM_PROJECTS = (req, res) => {
  // userId, teamId
}

teamsController.GET_TEAM = (req, res) => {
  // userId, teamId
}

teamsController.DELETE_TEAM = (req, res) => {
  // userId, teamId
}

module.exports = teamsController
