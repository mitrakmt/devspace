let Sequelize = require('sequelize')

module.exports = (db) => {
  const Projects = db.define('projects', {
    name: {
      type: Sequelize.STRING
    }
  })

  return Projects
}
