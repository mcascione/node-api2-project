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

router.post('/', async (req, res) => {
    const {title, contents} = req.body;
    try {
      if (!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
      } else {
        const {id} = await Post.insert({title, contents});
        res.status(201).json({id, title, contents});
      } 
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      })  
    }
})

module.exports = router;
