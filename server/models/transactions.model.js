require('dotenv').config()
let stripe = require('stripe')(process.env.STRIPE_KEY)
let Transactions = require('../db').Transactions

let transactionsModel = {}

transactionsModel.CREATE_STRIPE_ACCOUNT = () => {
  let country = req.body.country || 'US'
  let email = req.body.email
  stripe.accounts.create({
    managed: false,
    country: country,
    email: email
  }, (err, account) => {
    if (err) {
      return 'Err in creating Stripe account ' + err
    } else {
      return account
    }
  })
}

transactionsModel.LIST_CONNECTED_ACCOUNTS = () => {
  stripe.accounts.list({}, (err, accounts) => {
    if (err) {
      return 'Err in listing connected accounts ' + err
    } else {
      return accounts
    }
  })
}

transactionsModel.CREATE_SALE = () => {

}

module.exports = transactionsModel
