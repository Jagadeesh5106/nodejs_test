const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const Post = require("./models/post");
const Comment = require("./models/comment");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", postRoutes);
app.use("/comment", commentRoutes);

Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
