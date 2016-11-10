let express = require('express')
let app = express()
let logger = require('morgan')
let bodyParser = require('body-parser')
let GitHubStrategy = require('passport-github2').Strategy
let path = require('path')
let cors = require('cors')
let helmet = require('helmet')
let rootRouter = require('./routers')
let db = require('./db')
let session = require('express-session')
let passport = require('passport')
let Strategy = require('passport-github2').Strategy
let Users = require('./db').Users
let PORT = process.env.PORT || 8000

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(new Strategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:4200/api/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  profile = JSON.parse(profile['_raw'])
  profile.name = profile.name.split(' ')
  Users.findOrCreate({ 
    where: {
      email: profile.email
    },
    defaults: {
      username: profile.login,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      firstName: profile.name[0],
      lastName: profile.name[1],
      followerCount: profile.followers,
      followingCount: profile.following
    }
  })
  .then((user) => {
    console.log('INSIDE GITHUB LOGIN PROFILE', user)
    return done(null, user)
  })
}))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use(session({
  secret: 'sup',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/api/auth/github', 
  passport.authenticate('github', { scope: 'email'}), (req, res) => {
    console.log('inside auth/github')
  })
  
app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  console.log("inside auth/github/callback")
	res.redirect('/home')
})

app.use('/test', (req, res) => {
  console.log('sup request')
  res.send('We have contact!')
})

app.use('/api', rootRouter)

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
