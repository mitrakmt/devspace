let companiesModel = {}
let Users = require('../db').Users
let Companies = require('../db').Companies

companiesModel.GET_COMPANIES = (userId) => {
  return Users.find({
    where: {
      id: userId
    }
  })
  .then(user => {
    return user.getCompanies({})
      .then(companies => {
        return companies
      })
  })
}

companiesModel.CREATE_COMPANY = (userId, name, founded, admins) => {
  return Companies.create({
    name: name,
    status: true
  })
  .then(company => {
    company.setUsers(userId)
    return company
  })
}

companiesModel.GET_COMPANY = (userId, companyId) => {
  Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    return company
  })
}

companiesModel.UPDATE_COMPANY = (userId, companyId) => {
  Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    company.update({
      // something will go here, will also pass in more args
    })
  })
}

companiesModel.DELETE_COMPANY = (userId, companyId) => {
  Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    company.destroy()
      .then(status => {
        return 'Company successfully deleted'
      })
  })
}

companiesModel.GET_COMPANY_TEAMS = (userId, companyId) => {

}

companiesModel.GET_COMPANY_PROJECTS = (userId, companyId) => {

}

module.exports = companiesModel
