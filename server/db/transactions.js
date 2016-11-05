let Sequelize = require('sequelize')

module.exports = (db) => {
  const Transactions = db.define('transactions', {
    amount: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  })

  return Transactions
}
