let companiesModel = {}
let Users = require('../db').Users
let Companies = require('../db').Companies
let Teams = require('../db').Teams
let UsersCompanies = require('../db').UsersCompanies

companiesModel.GET_COMPANIES = (userId) => {
  return Users.findOne({
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

companiesModel.CREATE_COMPANY = (userId, name, admins, founded, description) => {
  return Companies.create({
    name: name,
    status: true,
    description: description,
    founded: founded,
    owner: userId
  })
  .then(company => {
    company.setUsers(userId)
    return company
  })
}

companiesModel.GET_COMPANY = (userId, companyId) => {
  return Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    return company
  })
}

companiesModel.UPDATE_COMPANY = (userId, companyId, companyDataToUpdate) => {
  let updatedCompanyData = _.pickBy(companyDataToUpdate, (item) => {
    return !_.isUndefined(item)
  })

  return Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    company.update(
      updatedCompanyData
    )
  })
  .then(result => {
    return result
  })
}

companiesModel.DELETE_COMPANY = (userId, companyId) => {
  return Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    if (userId === company.owner) {
      return company.destroy()
        .then(status => {
          return 'Company successfully deleted'
        })
    }
  })
}

companiesModel.ADD_ADMIN = (userId, companyId, idToAdd) => {
  return UsersCompanies.create({
    userId: idToAdd,
    companyId: companyId,
    isAdmin: true
  })
  .then(result => {
    return result
  })
}

companiesModel.REMOVE_ADMIN = (userId, companyId, idToDelete) => {
  return UsersCompanies.findOne({
    where: {
      userId: idToDelete,
      isAdmin: true
    }
  })
  .then(result => {
    result.destroy()
    return 'Successfully removed the admin '
  })
}

companiesModel.ADD_MEMBER = (userId, companyId, idToAdd) => {
  return UsersCompanies.create({
    userId: idToAdd,
    companyId: companyId,
    isAdmin: false
  })
  .then(result => {
    return result
  })
}

companiesModel.REMOVE_MEMBER = (userId, companyId, idToDelete) => {
  return UsersCompanies.findOne({
    where: {
      userId: idToDelete,
      companyId: companyId
    }
  })
  .then(result => {
    result.destroy()
    return 'Successfully removed the member '
  })
}

companiesModel.GET_COMPANY_TEAMS = (userId, companyId) => {
  Teams.findAll({
    where: {
      companyId: companyId
    }
  })
  .then(teams => {
    return teams
  })
}

companiesModel.GET_COMPANY_PROJECTS = (userId, companyId) => {
  Projects.findAll({
    where: {
      companyId: companyId
    }
  })
  .then(projects => {
    return projects
  })
}

module.exports = companiesModel
