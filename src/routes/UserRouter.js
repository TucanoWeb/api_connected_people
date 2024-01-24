const UserRouter = require("express").Router()

//Controller 
const {registerUser, loginUser} = require("../controller/UserControler")

// Middlewares
const validate = require("../middlewares/handleValidation");
const {userRegisterValidation, userLoginValidation} = require("../middlewares/userValidations")

//Routes
UserRouter.post("/register", userRegisterValidation(),  validate, registerUser )
UserRouter.post("/login", userLoginValidation(), validate, loginUser )


module.exports = UserRouter