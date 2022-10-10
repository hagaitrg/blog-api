exports.loginRequired = (req,res,next)=>{
    if (req.user) {
        next()
    }else{
        res.status(401).send({
            success:false,
            code:401,
            message:"Unauthorized!",
        })
    }
}


