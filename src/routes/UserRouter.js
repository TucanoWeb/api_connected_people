const UserRouter = require("express").Router()

//Controller 
const {registerUser} = require("../controller/UserControler")

// Middlewares
const validate = require("../middlewares/handleValidation");
const {userRegisterValidation} = require("../middlewares/userValidations")

UserRouter.post("/register", userRegisterValidation(),  validate, registerUser )


module.exports = UserRouter