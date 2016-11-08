let companiesController = {}
let Companies = require('../models').companiesModel

companiesController.GET_COMPANIES = (req, res) => {
  let userId = req.headers['userid']

  Companies.GET_COMPANIES(userId)
    .then(companies => {
      res.status(200).send(companies)
    })
}

companiesController.CREATE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let name = req.body.name
  let founded = req.body.founded
  let admins = req.body.admins

  Companies.CREATE_COMPANY(userId, name)
    .then(company => {
      res.status(200).send(company)
    })
}

companiesController.GET_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.GET_COMPANY(userId, companyId)
    .then(company => {
      res.status(200).send(company)
    })
}

companiesController.UPDATE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId
  // info to update in req.body

  Companies.UPDATE_COMPANY(userId, companyId)
    .then(company => {
      res.status(200).send(company)
    })
}

companiesController.DELETE_COMPANY = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId

  Companies.DELETE_COMPANY(userId, companyId)
    .then(company => {
      res.status(200).send(company)
    })
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

companiesController.ADD_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.body.companyId

  Companies.ADD_ADMIN(userId, companyId)
    .then(result => {
      res.status(200).send(result)
    })
}

companiesController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.body.companyId

  Companies.ADD_MEMBER(userId, companyId)
    .then(result => {
      res.status(200).send(result)
    })
}

module.exports = companiesController
