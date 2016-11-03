let rootRouter = require('express').Router()
let companiesRouter = require('./companies')
let paymentsRouter = require('./payments')
let postsRouter = require('./posts')
let projectsRouter = require('./projects')
let teamsRouter = require('./teams')
let usersRouter = require('./users')

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
