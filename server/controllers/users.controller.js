let Users = require('../models').usersModel
let Projects = require('../models').projectsModel

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
                console.log('languages in users controller', languages)
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
