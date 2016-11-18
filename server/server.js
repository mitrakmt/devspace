let express = require('express')
let app = express()
let logger = require('morgan')
let bodyParser = require('body-parser')
let GitHubStrategy = require('passport-github2').Strategy
let path = require('path')
let cors = require('cors')
let moment = require('moment')
let helmet = require('helmet')
let rootRouter = require('./routers')
let db = require('./db')
let session = require('express-session')
let passport = require('passport')
let Strategy = require('passport-github2').Strategy
let Users = require('./db').Users
let Follows = require('./db').Follows
let jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')
let PORT = process.env.PORT || 8000
let http = require('http').Server(app)
let io = require('socket.io')(http)

//socketio calls
io.on('connection', (socket)=>{
  console.log('socket connected');
  socket.on('disconnect', ()=>{
    console.log('socket disconnected');
  });
  socket.on('chat message', (msg)=>{
    io.emit('chat message server', msg)
    console.log('chat message', msg);
  })
})

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
  if (profile.name) {
    profile.name = profile.name.split(' ')
    profile.firstName = profile.name[0]
    profile.lastName = profile.name[1]
  }

  if (!profile.email) {
    profile.email = profile.login
  }

  Users.findOrCreate({ 
    where: {
      email: profile.email
    },
    defaults: {
      username: profile.login,
      email: profile.email,
      bio: profile.bio,
      cashFlow: 0,
      imageUrl: profile.avatar_url,
      location: profile.location,
      firstName: profile.firstName,
      lastName: profile.lastName,
      followerCount: 0,
      followingCount: 0
    }
  })
  .then(user => {
    Follows.findOne({
      where: {
        userId: user[0].id,
        followerId: user[0].id
      }
    })
    .then(follow => {
      if (follow === null) {
        return Follows.create({
          userId: user[0].id,
          followerId: user[0].id
        })
      }
    })

    return done(null, user)
  })
}))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use(cookieParser());
app.use(session({
  secret: 'sup',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/api/auth/github', 
  passport.authenticate('github', { scope: 'email'}), (req, res) => { })
  
app.get('/api/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      let userid = req.user[0].id
      let username = req.user[0].username

      let token = jwt.sign({
        userid: userid,
        exp: moment().add(7, 'd').valueOf()
      }, process.env.GITHUB_SECRET);

      res.cookie('userid', userid).cookie('token', token).cookie('username', username);
    
      res.redirect('/home');
    }
  )

app.use('/test', (req, res) => {
  res.send('We have contact!')
})

app.use('/api', rootRouter)

http.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
