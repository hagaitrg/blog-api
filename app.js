const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const db = require('./models/index')
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Successfully connected!')
}).catch(err=>{
    console.log("Failed to connect!", err);
    process.exit()
})

app.use((req,res,next)=>{
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]=== 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "chrombit2021", (err,decode)=>{
            if (err) req.user = undefined
            req.user = decode
            next()
        })
    }else{
        req.user=undefined
        next()
    }
})

// home endpoint
app.get("/api/v1/", (req,res)=>{
    res.status(200).send({message:"Welcome to blog app version 1"})
})

// importing all routes
const blogRoute = require('./routes/blog.route.js')
const userRoute = require('./routes/user.route')

// handling routes
app.use("/api/v1/blogs", blogRoute)
app.use("/api/v1/", userRoute)

app.use((req,res)=>{
    res.status(404).send({url:req.originalUrl+'not found'})
})

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})