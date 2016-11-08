let companiesController = {}
let Companies = require('../models').Companies

companiesController.GET_COMPANIES = (req, res) => {
  let userId = req.headers['userid']

  Companies.GET_COMPANIES(userId)
}

companiesController.CREATE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let name = req.body.name
  let founded = req.body.founded
  let admins = req.body.admins

  Companies.CREATE_COMPANY(userId, name, founded, admins)
}

companiesController.GET_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.GET_COMPANY(userId, companyId)
}

companiesController.UPDATE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId
  // info to update in req.body

  Companies.UPDATE_COMPANY(userId, companyId)
}

companiesController.DELETE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.DELETE_COMPANY(userId, companyId)
}

companiesController.GET_COMPANY_TEAMS = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.GET_COMPANY_TEAMS(userId, companyId)
}

companiesController.GET_COMPANY_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.GET_COMPANY_PROJECTS(userId, companyId)
}

module.exports = companiesController
