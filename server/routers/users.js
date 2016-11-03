let usersRouter = require('express').Router()

  usersRouter.route('/signup')
    .post()

  usersRouter.route('/login')
    .post()

  usersRouter.route('/delete')
    .delete()

  usersRouter.route('/edit')
    .put()

  usersRouter.route('/logout')
    .get()

  usersRouter.route('/followers')
    .get()
    .post()
    .delete()

  usersROuter.route('/following')
    .get()
    .post()
    .delete()

module.exports = usersRouter
