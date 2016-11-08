let Sequelize = require('sequelize')

module.exports = (db) => {
  const Projects = db.define('projects', {
    name: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    githubId: {
      type: Sequelize.INTEGER
    }
  })

  return Projects
}
