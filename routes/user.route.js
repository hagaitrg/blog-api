const userController = require('../controllers/user.controller')
var router = require('express').Router()

router.post("/register", userController.register)
router.post("/login", userController.login)

module.exports = router