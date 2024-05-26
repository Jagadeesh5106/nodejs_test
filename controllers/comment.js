const Comment = require("../models/comment");
const Post = require("../models/post");

exports.addComment = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId)
        .then((post) => {
            post
                .createComment(req.body)
                .then((result) => {

                    console.log("Comment Added", req.body);
                    return res.send({ message: "Comment Added" });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.getComments = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId)
        .then((post) => {
            post
                .getComments()
                .then((comments) => {
                    console.log(comments)
                    return res.send(comments);
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};