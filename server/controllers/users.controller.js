let Users = require('../models').usersModel
let usersController = {}


usersController.GET_PROFILE = (req, res) => {
  let userId = req.headers['userid']
  Users.GET_POSTS(userId)
    .then(posts => {
      return Users.GET_COMMENTS_AND_INTERACTIONS(userId, posts)
    })
    .then(allPosts => {
      res.status(200).send(allPosts)
    })
}

usersController.EDIT = (req, res) => {
  let userId = req.headers['userid']
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let bio = req.body.bio
  let imageUrl = req.body.imageUrl
  let userInfo = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    bio: bio,
    imageUrl: imageUrl
  }
  Users.EDIT(userId, userInfo)
    .then(result => {
      res.status(200).send(result)
    })
}

usersController.LOGOUT = (req, res) => {
  req.logout()
  res.redirect('/')
}

usersController.DELETE_USER = (req, res) => {
  let userId = req.headers['userid']
  Users.DELETE_USER(userId)
    .then(result => {
      res.status(200).send(result)
    })
}

module.exports = usersController
