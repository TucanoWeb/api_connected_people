const router = require("express").Router()


router.use("/api/users", require("./UserRouter"))


module.exports = router