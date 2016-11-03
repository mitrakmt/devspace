// Connect to database
let db = require('./db.config')

// Set table schema
let Companies = require('./companies')(db)
let Posts = require('./posts')(db)
let Projects = require('./projects')(db)
let Teams = require('./teams')(db)
let Users = require('./users')(db)
let Comments = require('./comments')(db)
let Transactions = require('./transactions')(db)
let Follows = require('./follows')(db)
let Reactions = require('./reactions')(db)

// Assign relationships


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
  Comments: Comments,
  Transactions: Transactions,
  Follows: Follows,
  Reactions: Reactions
}
