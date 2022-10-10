const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = (req,res)=>{
    if (!req.body) {
        return res.status(400).send({
            success:false,
            code:400,
            message:"Data cannot be empty!"
        })
    }

    if (req.body.confirm_password !== req.body.password) {
        return res.status(400).send({
            success:false,
            code:400,
            message:"Password and confirm password not same!"
        })
    }

    const user = new User({
        username:req.body.username,
        password:req.body.password,
    })
    user.password = bcrypt.hashSync(req.body.password, 10)
    user.save(user)
    .then(data=>{
        res.status(200).send({
            success:true,
            code:200,
            message:"Successfully register user",
            data:data
        })
    })
    .catch(err=>{
        res.status(400).send({
            success:false,
            code:400,
            message:err.message ||"Failed register user",
        })
    })
}

exports.login = (req, res) => {
    User.findOne({username:req.body.username})
    .then(data=>{
        if (data) {
            if(bcrypt.compareSync(req.body.password, data.password)){
                res.status(200).send({
                    message:"Login success",
                    token:jwt.sign({data},"chrombit2021")
                })
            }else{
                res.status(400).send({
                    success:false,
                    code:400,
                    message:"Invalid Password",
                })
            }
        }else{
            res.status(400).send({
                success:false,
                code:400,
                message:"Invalid Username",
            })
        }
    }).catch(err=>{
        console.log(err.message);
    })
}