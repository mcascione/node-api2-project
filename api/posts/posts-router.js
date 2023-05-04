// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find(req.query);
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The post information could not be retrieved",
    });
  }
});

module.exports = router;
