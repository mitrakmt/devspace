let companiesRouter = require('express').Router()
let companiesController = require('../controllers').companiesController

companiesRouter.route('/')
  .get(companiesController.GET_COMPANIES)
    // Requires companyId
  .post(companiesController.CREATE_COMPANY)
    // Requires name, founded date, userId, other admins by email

companiesRouter.route('/:companyId')
  .get(companiesController.GET_COMPANY)
    // Requires companyId, userId
  .put(companiesController.UPDATE_COMPANY)
    // Requires companyId, userId, information to update
  .delete(companiesController.DELETE_COMPANY)
    // Requires companyId, userId
    //
companiesRouter.route('/:companyId/admin')
  .post(companiesController.ADD_ADMIN)
    // Requires userId header, companyId in req url, idToAdd in req.body
  .delete(companiesController.REMOVE_ADMIN)
    // Requires userId header, companyId in req url, idToRemove in req.body

companiesRouter.route('/:companyId/member')
  .post(companiesController.ADD_MEMBER)
    // Requires userId header, companyId in req url, idToAdd in req.body
  .delete(companiesController.REMOVE_MEMBER)
    // Requires userId header, companyId in req url, idToRemove in req.body

companiesRouter.route('/teams')
  .get(companiesController.GET_COMPANY_TEAMS)
    // Requires companyId, userId

companiesRouter.route('/projects')
  .get(companiesController.GET_COMPANY_PROJECTS)
    // Requires companyId,  userId

module.exports = companiesRouter
