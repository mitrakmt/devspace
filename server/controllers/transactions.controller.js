let Transactions = require('../db').Transactions
let transactionsModel = require('../models').transactionsModel
let transactionsController = {}

transactionsController.CREATE_MERCHANT = (req, res) => {

}

transactionsController.CONFIRM_MERCHANT = (req, res) => {

}

transactionsController.CREATE_SALE = (req, res) => {

}

transactionsController.SUBSCRIBE_TO_PLAN = (req, res) => {
  let token = req.body.stripeToken
  let plan = req.body.plan
  let email = req.body.email

  transactionsModel.SUBSCRIBE_TO_PLAN(token, email, plan)
    .then(customer => {
      Transactions.create({
        amount: 9.99,
        description: plan
      })
    })
}

module.exports = transactionsController
