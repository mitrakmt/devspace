let rootRouter = require('express').Router()
let companiesRouter = require('./companies.router')
let paymentsRouter = require('./payments.router')
let postsRouter = require('./posts.router')
let projectsRouter = require('./projects.router')
let teamsRouter = require('./teams.router')
let usersRouter = require('./users.router')

rootRouter.use('/companies', companiesRouter)
rootRouter.use('/payments', paymentsRouter)
rootRouter.use('/posts', postsRouter)
rootRouter.use('/projects', projectsRouter)
rootRouter.use('/teams', teamsRouter)
rootRouter.use('/users', usersRouter)

module.exports = {
  companiesRouter: companiesRouter,
  paymentsRouter: paymentsRouter,
  postsRouter: postsRouter,
  projectsRouter: projectsRouter,
  teamsRouter: teamsRouter,
  usersRouter: usersRouter
}
