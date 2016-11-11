const request = require('request-promise')

let homeModel = {}

// 'api.github.com/users/:username/received_events'
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

// 'api.github.com/users/dfle/events/public'
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

// 'api.github.com/orgs/:org/events'
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

module.exports = homeModel
