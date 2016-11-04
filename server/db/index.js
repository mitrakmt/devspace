// Connect to database
let db = require('./db.config')
let Sequelize = require('sequelize')

// Set table schema
let Companies = require('./companies')(db)
let Posts = require('./posts')(db)
let Projects = require('./projects')(db)
let Teams = require('./teams')(db)
let Users = require('./users')(db)
let Transactions = require('./transactions')(db)
let Follows = require('./follows')(db)
let Interactions = require('./interactions')(db)

// Create join tables
const UsersCompanies = Sequelize.define('UsersCompanies', {})
const UsersTeams = Sequelize.define('UsersTeams', {})
const UsersProjects = Sequelize.define('UsersProjects', {})

// Assign relationships
Projects.belongsTo(Companies)
Projects.belongsTo(Teams)
Teams.belongsTo(Companies)
Teams.hasMany(Projects, {foreignKey: 'teamId', constraints: false})
Companies.hasMany(Teams, {foreignKey: 'companyId', constraints: false})
Companies.hasMany(Projects, {foreignKey: 'companyId', constraints: false})

Projects.belongsToMany(Users, {through: UsersProjects, foreignKey: 'projectId'})
Users.belongsToMany(Projects, {through: UsersProjects, foreignKey: 'userId'})

Teams.belongsToMany(Users, {through: UsersTeams, foreignKey: 'teamId'})
Users.belongsToMany(Teams, {through: UsersTeams, foreignKey: 'userId'})

Companies.belongsToMany(Users, {through: UsersCompanies, foreignKey: 'companyId'})
Users.belongsToMany(Companies, {through: UsersCompanies, foreignKey: 'userId'})

Posts.belongsTo(Users)
Interactions.belongsTo(Users)
Interactions.belongsTo(Posts)

Follows.belongsTo(Users, {as: 'follower', foreignKey: 'followerId'})
Follows.belongsTo(Users, {as: 'followed', foreignKey: 'followedId'})

Transactions.belongsTo(Users, {as: 'seller', foreignKey: 'sellerId'})
Transactions.belongsTo(Users, {as: 'buyer', foreignKey: 'buyerId'})

// // HELPER TO DROP ALL TABLES
// db.sync({force: true}).then(() => {
//   console.log('Tables have been dropped')
// })
db.sync().then(() => {
  console.log('Tables have been Created')
})

module.exports = {
  db: db,
  Companies: Companies,
  Posts: Posts,
  Projects: Projects,
  Teams: Teams,
  Users: Users,
  Transactions: Transactions,
  Follows: Follows,
  Interactions: Interactions
}
