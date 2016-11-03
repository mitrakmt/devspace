require('dotenv').config()
const sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://' + process.env.DB_User + ':' + process.env.DB_Password + '@elmer.db.elephantsql.com:5432/bhdobipj')

sequelize.authenticate()
  .then(function () {
    console.log('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })




// // HELPER TO DROP ALL TABLES
// sequelize.sync({force: true}).then(function () {
//   console.log('Tables have been dropped')
// })

sequelize.sync().then(function () {
  console.log('Tables have been Created')
})

module.exports = {

}
