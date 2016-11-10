let Sequelize = require('sequelize')

module.exports = (db) => {
  const Projects = db.define('projects', {
    name: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    githubId: {
      type: Sequelize.INTEGER
    },
    deadline: {
      type: Sequelize.DATE
    }
  })

  return Projects
}
