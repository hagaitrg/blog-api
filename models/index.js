const dbConfig = require('../config/db.config')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.blogs = require('./blog.models.js')(mongoose)
db.users = require('./user.model.js')(mongoose)


module.exports = db