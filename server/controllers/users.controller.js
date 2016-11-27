let Users = require('../models').usersModel
let Projects = require('../models').projectsModel
let request = require('request-promise')

let usersController = {}

usersController.GET_PROFILE = (req, res) => {
  let userId = req.headers['userid']
  Users.GET_POSTS(userId)
    .then(posts => {
      if (!posts) {
        res.status(204).send(false)
      }
      return Users.GET_COMMENTS_AND_INTERACTIONS(userId, posts)
    })
    .then(allPosts => {
      res.status(200).send(allPosts)
    })
}

usersController.LOGIN = (req, res) => {
  let options = {
    'redirect_uri': 'https://devspace.herokuapp.com/home'
  }

  res.redirect('https://github.com/login/oauth/authorize?scope=user:email&client_id=' + process.env.GITHUB_ID + '&redirect_uri=https://devspace.herokuapp.com/home')
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
      if (user) {
        res.status(200).send({
          "followingCount": user.followingCount,
          "followerCount": user.followerCount
        })
      } else {
        res.status(204).send('User not found')
      }
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
      if (!user) {
        return false
      }
      
      let parsedUser = JSON.parse(user)
      res.status(200).send({
        "avatar_url": parsedUser.avatar_url,
        "url": parsedUser.url,
        "name": parsedUser.name,
        "username": parsedUser.login,
        "bio": parsedUser.bio,
        "company": parsedUser.company,
        "followers": parsedUser.followers,
        "following": parsedUser.following,
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

// Check if on platform, true or false
usersController.SEARCH_USERS = (req, res) => {
  let searchText = req.headers['searchtext']
  let username = req.headers['username']
  let sortBy = 'followers'
  let options = {
    url: `https://api.github.com/search/users?q=${searchText}&sort=${sortBy}`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
    .then(users => {
      res.status(200).send(users)
    })
}

usersController.GET_MEMBER_STATUS = (req, res) => {
  let username = req.headers['username']

  Users.GET_MEMBER_STATUS(username)
    .then(status => {
      res.status(200).send(status)
    })
}

usersController.GET_AVATAR = (req, res) => {
  let username = req.headers['username']

  Users.GET_AVATAR(username)
    .then(userAvatar => {
      res.status(200).send(userAvatar)
    })
}

usersController.GET_USER_PROFILE_FEED = (req, res) => {
  let userId = req.headers['userid']
  let username = req.headers['username']
  
  Users.GET_USER_PROFILE_FEED(username, userId)
    .then(response => {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(204).send('No found user')
      }
    })
}

usersController.GET_ALL_BYTES_OF_CODE = (req, res) => {
  let username = req.headers['username']
  Users.GET_USER(username)
    .then(user => {
      if (user) {
        let userId = user.id
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

          return Promise.all(promises)
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
              langStats.unshift({language: ['total', total]})
              res.status(200).send(langStats)
            })
            .catch(err => {
              res.status(204).send(err)
            })
        })
      } else {
        res.status(204).send('No found user')
      }
    })
}
module.exports = usersController
