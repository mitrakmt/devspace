let companiesController = {}

companiesController.GET_COMPANIES = (req, res) => {
  // companyId
}

companiesController.CREATE_COMPANY = (req, res) => {
  let userId = req.headers['userId']
  // company name, founded date, userId, other admins by email
}

companiesController.GET_COMPANY = (req, res) => {
  let userId = req.headers['userId']
  // companyId, userId
}

companiesController.UPDATE_COMPANY = (req, res) => {
  let userId = req.headers['userId']
  // companyId, userId, info to update in req.body
}

companiesController.DELETE_COMPANY = (req, res) => {
  let userId = req.headers['userId']
  // companyId, userId
}

companiesController.GET_COMPANY_TEAMS = (req, res) => {
  let userId = req.headers['userId']
  // companyId, userId
}

companiesController.GET_COMPANY_PROJECTS = (req, res) => {
  let userId = req.headers['userId']
  // companyId, userId
}

module.exports = companiesController
