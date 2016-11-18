// Connect to database
let db = require('./db.config')
let Sequelize = require('sequelize')

// Set table schema
let Companies = require('./companies')(db)
let Projects = require('./projects')(db)
let Teams = require('./teams')(db)
let Users = require('./users')(db)
let Posts = require('./posts')(db)
let Comments = require('./comments')(db)
let Interactions = require('./interactions')(db)
let Chats = require('./chats')(db)
let Follows = require('./follows')(db)
let Transactions = require('./transactions')(db)

// Create join tables
const UsersCompanies = db.define('UsersCompanies', {
  isAdmin: Sequelize.BOOLEAN
})
const UsersTeams = db.define('UsersTeams', {
  isAdmin: Sequelize.BOOLEAN
})
const UsersProjects = db.define('UsersProjects', {
  isAdmin: Sequelize.BOOLEAN
})

// Assign relationships

/* *
* Companies:Teams:Projects
* */

/* *
* Companies:Teams (1:n)
* Companies:Projects (1:n)
* Teams:Companies (1:1)
* Teams:Projects (1:n)
* Projects:Teams (1:1)
* Projects:Companies (1:1)
* */
Companies.hasMany(Teams, {foreignKey: 'companyId'})
Companies.hasMany(Projects, {foreignKey: 'companyId'})
Teams.belongsTo(Companies)
Teams.hasMany(Projects, {foreignKey: 'teamId'})
Projects.belongsTo(Companies)
Projects.belongsTo(Teams)

// Companies:Users (n:m)
Companies.belongsToMany(Users, {through: UsersCompanies, foreignKey: 'companyId'})
Users.belongsToMany(Companies, {through: UsersCompanies, foreignKey: 'userId'})

// Teams:Users (n:m)
Teams.belongsToMany(Users, {through: UsersTeams, foreignKey: 'teamId'})
Users.belongsToMany(Teams, {through: UsersTeams, foreignKey: 'userId'})

// Projects:Users (n:m)
Projects.belongsToMany(Users, {through: UsersProjects, foreignKey: 'projectId'})
Users.belongsToMany(Projects, {through: UsersProjects, foreignKey: 'userId'})

/* *
* Posts:Comments:Interactions:Users
* */

// Posts:Users (1:1)
// Users:Posts (1:n)
Posts.belongsTo(Users)
Users.hasMany(Posts, {foreignKey: 'userId', onDelete: 'cascade'})

// Comments:Users (1:1)
// Users:Comments (1:n)
Comments.belongsTo(Users)
Users.hasMany(Comments, {foreignKey: 'userId', onDelete: 'cascade'})

// Interactions:Users (1:1)
// Users:Interactions (1:n)
Interactions.belongsTo(Users)
Users.hasMany(Interactions, {foreignKey: 'userId'})

// Comments:Posts (1:1)
// Posts:Comments (1:n)
Comments.belongsTo(Posts)
Posts.hasMany(Comments, {foreignKey: 'postId', onDelete: 'cascade'})

// Interactions:Posts (1:1)
// Posts:Interactions (1:n)
Interactions.belongsTo(Posts)
Posts.hasMany(Interactions, {foreignKey: 'postId', onDelete: 'cascade'})

/* *
* ChatRooms:Chats:Users
* */

// Chats:Users (1:1)
// Users:Chats (1:n)
Chats.belongsTo(Users)
Users.hasMany(Chats, {foreignKey: 'userId', onDelete: 'cascade'})

/* *
* Follows:Users
* */

// Users:Follows (1:n)
// Follows:Users (1:2)
// Users:Users (n:m)

// option { onDelete: 'cascade' } leaves no orphans http://dba.stackexchange.com/questions/44956/good-explanation-of-cascade-on-delete-update-behavior
// option { hooks: true } destroys each instance one by one to safely delete http://docs.sequelizejs.com/en/latest/docs/hooks/
Users.belongsToMany(Users, { as: 'followedUsers', through: Follows, foreignKey: 'followerId', onDelete: 'cascade', hooks: true })
Users.belongsToMany(Users, { as: 'followers', through: Follows, foreignKey: 'userId', onDelete: 'cascade', hooks: true })

/* *
* Transactions:Users
* */

// Users:Transactions (1:n)
// Transactions:Users (1:2)
Transactions.belongsTo(Users, {as: 'seller', foreignKey: 'sellerId'})
Transactions.belongsTo(Users, {as: 'buyer', foreignKey: 'buyerId'})

Users.hasMany(Transactions, { as: 'sales', foreignKey: 'sellerId', onDelete: 'cascade', hooks: true })
Users.hasMany(Transactions, { as: 'purchases', foreignKey: 'buyerId', onDelete: 'cascade', hooks: true })

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
  Interactions: Interactions,
  Chats: Chats,
  Comments: Comments,
  UsersCompanies: UsersCompanies,
  UsersTeams: UsersTeams,
  UsersProjects: UsersProjects
}
