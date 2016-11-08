let homeController = {}
let Promise = require('bluebird')
let Home = require('../models').Home

homeController.GET_HOME = (req, res) => {
  console.log('inside home controller')
  Promise.all([Home.GET_RECEIVED_EVENTS('dfle'), Home.GET_PUBLIC_EVENTS_BY_USER('mitrakmt')])
    .then(values => {
      return values.map(val => {
        return JSON.parse(val)
      })
    })
    .then(result => {
      res.send(result)
    })
}

module.exports = homeController
