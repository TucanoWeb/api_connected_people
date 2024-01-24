const Sequelize = require("sequelize")
const {connection} = require("../config/db")


const User = connection.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profileImage: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.STRING
  }
})


User.sync({force: false})


module.exports = User