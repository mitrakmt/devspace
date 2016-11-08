let usersRouter = require('express').Router()
let usersController = require('../controllers').usersController
const passport = require('passport')

usersRouter.route('/profile')
  .get(usersController.GET_PROFILE)

// usersRouter.route('/login')
//   .get((req, res) => {
//     res.render('https://github.com/login/oauth/authorize?client_id=b83b7a6429ff48c6fd4e')
//   })
//
// usersRouter.route('/edit')
//   .put((req, res) => {
//
//   })
//
// usersRouter.route('/logout')
//   .get((req, res) => {
//     req.logout()
//     res.redirect('/')
//   })
//
//   usersRouter.route('/delete')
//     .delete()
//
//   usersRouter.route('/followers')
//     .get()
//     .post()
//     .delete()
//
//   usersRouter.route('/following')
//     .get()
//     .post()
//     .delete()

module.exports = usersRouter
