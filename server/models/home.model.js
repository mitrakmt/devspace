const request = require('request-promise')

let homeModel = {}

'api.github.com/users/:username/received_events'
homeModel.GET_RECEIVED_EVENTS = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/received_events`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     return `Err in getting received events for user: ${username} - ${err}`
   })
}

'api.github.com/users/dfle/events/public'
homeModel.GET_PUBLIC_EVENTS_BY_USER = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/events/public`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     return `Err in getting public events by user: ${username} - ${err}`
   })
}

'api.github.com/orgs/:org/events'
homeModel.GET_PUBLIC_EVENTS_BY_ORG = (org) => {
  let options = {
    url: `https://api.github.com/orgs/${org}/events`,
    headers: {
      'User-Agent': org
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     return `Err in getting public events by org: ${org} - ${err}`
   })
}

'api.github.com/repos/dfle/devspace/branches'
homeModel.GET_BRANCHES = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/branches`,
    headers: {
      'User-Agent': username
    }
  }

  request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/repos/dfle/devspace/commits'
homeModel.GET_COMMITS = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/commits`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/repos/dfle/devspace/readme'
homeModel.GET_README = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/readme`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/repos/hackersquare/devspace/forks'
homeModel.GET_FORKS = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/forks`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/repos/hackersquare/devspace/contributors'
homeModel.GET_CONTRIBUTORS = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/contributors`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/repos/:owner/:repo/languages'
homeModel.LIST_LANGUAGES = (username, repo) => {
  let options = {
    url: `https://api.github.com/repos/${username}/${repo}/languages`,
    headers: {
      'User-Agent': username
    }
  }

  return request.get(options)
   .then(result => {
     return result
   })
   .catch(err => {
     console.log(err)
   })
}

'api.github.com/users/:username/repos'
// homeModel.GET_PROJECT_SIDEBAR = (username) => {
//   let options = {
//     url: `https://api.github.com/users/${username}/repos`,
//     headers: {
//       'User-Agent': username
//     }
//   }
//
//   return request.get(options)
//    .then(result => {
//      return result
//    })
//    .catch(err => {
//      console.log(err)
//    })
// }

// MUST BE AUTHENTICATED
'api.github.com/users/:username/events/orgs/:org'

module.exports = homeModel
