let usersRouter = require('express').Router()
const passport = require('passport')
let config = require('../config')

usersRouter.route('/auth')
  .get(passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {})

usersRouter.route('/auth/github/callback')
  .get((req, res) => {
    passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      res.redirect('/')
    }
  })

usersRouter.route('/account')
  .get(config.ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user })
  })

usersRouter.route('/login')
  .get((req, res) => {
    res.render('login', { user: req.user })
  })

usersRouter.route('/edit')
  .put((req, res) => {

  })

usersRouter.route('/logout')
  .get((req, res) => {
    req.logout()
    res.redirect('/')
  })

  // usersRouter.route('/delete')
  //   .delete()
  //
  // usersRouter.route('/followers')
  //   .get()
  //   .post()
  //   .delete()
  //
  // usersRouter.route('/following')
  //   .get()
  //   .post()
  //   .delete()

module.exports = usersRouter
