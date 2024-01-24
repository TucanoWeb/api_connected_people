const express = require("express");
const routes = require("./routes/Router");
const app = express()


// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Config Routes
app.use("/", routes)

const port = 5000


app.listen(port, () => console.log("API Running"))