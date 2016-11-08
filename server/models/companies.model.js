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
  return Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    return company
  })
}

companiesModel.UPDATE_COMPANY = (userId, companyId) => {
  return Companies.findOne({
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
  return Companies.findOne({
    where: {
      id: companyId
    }
  })
  .then(company => {
    return company.destroy()
      .then(status => {
        return 'Company successfully deleted'
      })
  })
}

companiesModel.ADD_ADMIN = (userId, companyId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return Companies.findOne({
      where: {
        id: companyId
      }
    })
    .then(company => {
      user.setCompanies(company, { isAdmin: true })
    })
  })
}

companiesModel.REMOVE_ADMIN = (userId, companyId, idToDelete) => {

}

companiesModel.ADD_MEMBER = (userId, companyId) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return Companies.findOne({
      where: {
        id: companyId
      }
    })
    .then(company => {
      return user.setCompanies(company, { isAdmin: false })
        .then(status => {
          return status
        })
    })
  })
}

companiesModel.REMOVE_MEMBER = (userId, companyId, idToDelete) => {
  return Users.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    return Companies.findOne({
      where: {
        id: companyId
      }
    })
    .then(company => {
      return user.getCompanies(company, { isAdmin: true })
        .then(companyAdmin => {
          if (companyAdmin) {
            return Users.findOne({
              where: {
                id: idToDelete
              }
            })
            .then(user => {
              return user.getCompanies(company)
                .then(result => {
                  result.destroy()
                    .then(status => {
                      return status
                    })
                })
            })
          }
        })
    })
  })
}

companiesModel.GET_COMPANY_TEAMS = (userId, companyId) => {

}

companiesModel.GET_COMPANY_PROJECTS = (userId, companyId) => {

}

module.exports = companiesModel
