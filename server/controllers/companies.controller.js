let Companies = require('../models').companiesModel
let companiesController = {}

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
  let description = req.body.description

  Companies.CREATE_COMPANY(userId, name, admins, founded, description)
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
  let companyName = req.body.companyName
  let founded = req.body.founded
  let companyDescription = req.body.companyDescription
  let companyInfoToUpdate = {
    companyDescription: companyDescription,
    companyName: companyName,
    founded: founded
  }

  Companies.UPDATE_COMPANY(userId, companyId, companyInfoToUpdate)
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
  let companyId = req.params.companyId
  let idToAdd = req.body.idToAdd

  Companies.ADD_ADMIN(userId, companyId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

companiesController.REMOVE_ADMIN = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId
  let idToRemove = req.body.idToRemove

  Companies.REMOVE_ADMIN(userId, companyId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

companiesController.ADD_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId
  let idToAdd = req.body.idToAdd

  Companies.ADD_MEMBER(userId, companyId, idToAdd)
    .then(result => {
      res.status(200).send(result)
    })
}

companiesController.REMOVE_MEMBER = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.params.companyId
  let idToRemove = req.body.idToRemove

  Companies.REMOVE_MEMBER(userId, companyId, idToRemove)
    .then(result => {
      res.status(200).send(result)
    })
}

companiesController.GET_COMPANY_TEAMS = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.body.companyId
  Companies.GET_COMPANY_TEAMS(userId, companyId)
    .then(teams => {
      res.status(200).send(teams)
    })
}

companiesController.GET_COMPANY_PROJECTS = (req, res) => {
  let userId = req.headers['userid']
  let companyId = req.body.companyId
  Companies.GET_COMPANY_PROJECTS(userId, companyId)
    .then(projects => {
      res.status(200).send(projects)
    })
}

module.exports = companiesController
