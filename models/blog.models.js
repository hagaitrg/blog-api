module.exports = mongoose=>{
    const Blog = mongoose.model(
        "blogs",
        mongoose.Schema({
            title:String,
            body:String,
            slug:[String],
        })
    )

    return Blog
}