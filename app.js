const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log("Connected to Db");
});
const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}).then((posts) => {
    res.render("home", { startingcontent: homeStartingContent, posts: posts });
  });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutcontent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactcontent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postbody,
  });
  post.save();
  res.redirect("/");
});
app.get("/posts/:postid", function (req, res) {
  const requestedpostid = req.params.postid;
  Post.findOne({ _id: requestedpostid })
    .then((post) => {
      res.render("post", { posttitle: post.title, postcontent: post.content });
    })
    .catch(function (err) {
      console.log(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function (res) {
  console.log("server connected succesfully");
});

const homeStartingContent =
  "Welcome to your dairy.Site where you can share all your memories";
const aboutContent = "This site helps you save all your memories.";
const contactContent =
  "This is the contact page.For any queries contact to sahiparyani313@gmail.com";
