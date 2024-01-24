const express = require("express");
const app = express()


// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Test route
app.get("/", (req, res) => {
  res.send("Api Working")
})

//Config Routes
const routes = require("./routes/Router");
app.use(routes)



//Conection DB
require("./config/db").connect()


const port = 5000


app.listen(port, () => console.log("API Running"))