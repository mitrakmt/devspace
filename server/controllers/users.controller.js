let usersController = {}
let Users = require('../models').usersModel

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

usersController.signup = () => {

}

usersController.login = () => {

}

usersController.edit = () => {

}

usersController.delete = () => {

}

usersController.logout = () => {

}

module.exports = usersController
