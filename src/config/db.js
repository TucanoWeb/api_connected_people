const Sequelize = require("sequelize")

const connection = new Sequelize("connected_people", "root", "14109015", {
  host: "localhost",
  dialect: "mysql"
})


const connect = () => {

  connection  
    .authenticate()
    .then(() => {})
    .catch(error => console.log(error))

}


module.exports = {connection, connect}