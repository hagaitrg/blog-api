const blogController = require('../controllers/blog.controller.js')
const userHandler = require('../middlewares/loginRequired')
var router = require('express').Router()

router.post("/", userHandler.loginRequired, blogController.create)
router.get("/:id",userHandler.loginRequired, blogController.getById)
router.get("/", userHandler.loginRequired,blogController.getAll)
router.put("/:id",userHandler.loginRequired, blogController.update)
router.delete("/:id",userHandler.loginRequired, blogController.delete)

module.exports = router