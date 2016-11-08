let teamsController = {}

teamsController.GET_TEAMS = (req, res) => {
  let userId = req.headers['userid']

}

teamsController.CREATE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  // userId, team info (name, description, other admins by email)
}

teamsController.GET_TEAM_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  // userId, teamId
}

teamsController.GET_TEAM = (req, res) => {
  let userId = req.headers['userid']
  // userId, teamId
}

teamsController.DELETE_TEAM = (req, res) => {
  let userId = req.headers['userid']
  // userId, teamId
}

module.exports = teamsController
