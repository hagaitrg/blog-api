const db = require('../models')
const Blog = db.blogs

exports.create = (req,res) =>{
    if (!req.body) {
        return res.status(400).send({
            success:false,
            code:400,
            message:"Data cannot be empty!"
        })
    }
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        slug: req.body.slug,
    })

    blog.save(blog)
    .then(data=>{
        res.status(200).send({
            success:true,
            code:200,
            message:"Successfully saved blog",
            data:data
        })
    })
    .catch(err=>{
        res.status(400).send({
            success:false,
            code:400,
            message:err.message ||"Failed saved blog",
        })
    })
}

exports.getById = (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then(data=>{
        if (!data) {
            res.status(404).send({
                success : false,
                code: 404,
                message: "Blog data not found!"
            })
        }else{
            res.status(200).send({
                success : true,
                code : 200,
                message : 'Success get detail blog',
                data : data,
            })
        }
    })
    .catch(err=>{
        res.status(400).send({
            success : false,
            code: 400,
            message: err.message || "Failed to get detail blog"
        })
    })
}

exports.getAll=(req,res)=>{
    Blog.find({})
    .then(data=>{
        if (!data) {
            res.status(404).send({
                success : false,
                code: 404,
                message: "Blog data is empty!"
            })
        }else{
            res.status(200).send({
                success : true,
                code : 200,
                message : 'Success get all blog',
                data : data,
            })
        }
    })
    .catch(err=>{
        res.status(400).send({
            success : false,
            code: 400,
            message: err.message || "Failed to get all blog"
        })
    })
}

exports.update = (req, res)=>{
    const id = req.params.id

    if (!req.body) {
        return  res.status(404).send({
            success : false,
            code: 404,
            message: "Data cannot be empty!"
        })
    }

    Blog.findByIdAndUpdate(id,{
        title: req.body.title,
        body: req.body.body,
        slug: req.body.slug,
    })
    .then(data=>{
        if (!data) {
            res.status(400).send({
                success : false,
                code : 400,
                message : `Cannot update blog with id=${id} or not found!`,
            })
        }else{
            res.status(200).send({
                success : true,
                code : 200,
                message : 'Success update blog data',
            })
        }
    })
    .catch(err=>{
        res.status(400).send({
            success : false,
            code: 400,
            message: err.message || "Failed to update blog data"
        })
    })
}

exports.delete = (req, res) =>{
    const id = req.params.id

    Blog.findByIdAndRemove(id)
    .then(data=>{
        if (!data) {
            res.status(400).send({
                success : false,
                code : 400,
                message : `Cannot delete blog with id=${id} or not found!`,
            })
        }else{
            res.status(200).send({
                success : true,
                code : 200,
                message : 'Success delete blog data',
            })
        }
    })
    .catch(err=>{
        res.status(400).send({
            success : false,
            code: 400,
            message: err.message || "Failed to update blog data"
        })
    })
}