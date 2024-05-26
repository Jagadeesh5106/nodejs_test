const Post = require('../models/post')
exports.createPost = (req, res, next) => {
    Post.create(req.body).then(result => {
        console.log("post inserted into table");
        res.json({ message: "post inserted" })
    }).catch(err => {
        console.log(err);
    })
}

exports.getPosts = (req, res, next) => {
    Post.findAll().then(posts => {
        console.log(posts);
        res.json(posts);
    }).catch(err => {
        console.log(err);
    })
}

