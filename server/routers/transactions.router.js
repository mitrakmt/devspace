let transactionsRouter = require('express').Router()
let transactionsController = require('../controllers').transactionsController

transactionsRouter.route('/merchant/create')
  .post(transactionsController.CREATE_MERCHANT)

transactionsRouter.route('/merchant/confirm')
  .post(transactionsController.CONFIRM_MERCHANT)

transactionsRouter.route('/sale')
  .post(transactionsController.CREATE_SALE)

module.exports = transactionsRouter
