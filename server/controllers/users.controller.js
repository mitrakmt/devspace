let Users = require('../models').usersModel
let Projects = require('../models').projectsModel
const request = require('request-promise')

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

usersController.LOGIN = (req, res) => {
  let options = {
    'redirect_uri': 'localhost:4200/home'
  }

  res.redirect('https://github.com/login/oauth/authorize?scope=user:email&client_id=' + process.env.GITHUB_ID + '&redirect_uri=localhost:4200/home')
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

usersController.GET_USER = (req, res) => {
  let username = req.headers['username']
  Users.GET_USER(username)
    .then(user => {
      res.status(200).send({
        "firstName": user.firstName,
        "lastName": user.lastName,
        "username": user.username,
        "bio": user.bio,
        "imageUrl": user.imageUrl,
        "followerCount": user.followerCount,
        "followingCount": user.followingCount,
        "userId": user.id
      })
    })
}

usersController.GET_USER_GITHUB = (req, res) => {
  let currentUser = req.headers['currentUser']
  let username = req.headers['username']
  let options = {
    url: `https://api.github.com/users/${username}`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
    .then(user => {
      let parsedUser = JSON.parse(user)
      res.status(200).send({
        "avatar_url": parsedUser.avatar_url,
        "url": parsedUser.url,
        "company": parsedUser.company,
        "blog": parsedUser.blog,
        "location": parsedUser.location,
        "public_repos": parsedUser.public_repos,
        "public_gists": parsedUser.public_gists
      })
    })
    .catch(err => {
      return `Err in getting user profile`
    })
}

usersController.GET_ALL_BYTES_OF_CODE = (req, res) => {
  let userId = req.headers['userid']
  Users.GET_USER(userId)
    .then(user => {
      let username = user.username
      Projects.GET_PROJECTS(userId)
      .then(projects => {
        let promises = projects.map(project => {
          let repo = project.name
          return new Promise((resolve, reject) => {
            Projects.GET_LANGUAGES(username, repo)
              .then(languages => {
                if (Object.keys(languages).length === 0) {
                  resolve(null)
                }
                resolve(languages)
              })
              .catch(err => {
                reject(err)
              })
          })
        })

        Promise.all(promises)
          .then(langs => {
            // sum up the total bytes of code in each language across all projects
            let stats = {}
            let langStats = []
            let total = 0
            langs.forEach(langObj => {
              for (let key in langObj) {
                if (!stats[key] && langObj[key] !== null) {
                  stats[key] = langObj[key]
                } else {
                  stats[key] += langObj[key]
                }
              }
            })

            for (let key in stats) {
              total += stats[key]
              langStats.push({language: [key, stats[key]]})
            }
            langStats.push({language: ['total', total]})
            res.status(200).send(langStats)
          })
          .catch(err => {
            res.status(204).send(err)
          })
      })
    })
}
module.exports = usersController
