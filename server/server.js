let express = require('express')
let app = express()
let logger = require('morgan')
let bodyParser = require('body-parser')
let passport = require('passport')
let GitHubStrategy = require('passport-github2').Strategy
let path = require('path')
let cors = require('cors')
let helmet = require('helmet')
let rootRouter = require('./routers')
let db = require('./db')
let Users = require('./db').Users
let PORT = process.env.PORT || 8000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/test', (req, res) => {
  console.log('sup request')
  res.send('We have contact!')
})

app.use('/api', rootRouter)

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
