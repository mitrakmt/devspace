let usersModel = {}
let Users = require('../db').Users
let Posts = require('../db').Posts
let Comments = require('../db').Comments
let Interactions = require('../db').Interactions

usersModel.GET_PROFILE = (userId) => {
  Users.findOne({
    where: {
      userId: userId
    }
  })
  .then(user => {
    
  })

  return {

  }
}

module.exports = usersModel
