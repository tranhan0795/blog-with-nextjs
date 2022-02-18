const router = require("express").Router();
const Post = require("../model/Post.js");

//create post
router.post("/", async (req, res) => {
    console.log(req.body);
    const newPost = new Post({
        username:req.body.username,
        content:req.body.content,
        photo:req.body.photo,
        title:req.body.title
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
       console.log(err);
        res.status(500).json(err);
        
    }
});

//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only update your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only delete your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all post
router.get("/", async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.cat;

    try {
        let posts;
        
        if (username) {
            posts = await Post.find({username});
        } else if (categoryName) {
            posts = await Post.find({
                categories: {
                    $in: [categoryName],
                },
            });
        } else {         
            posts = await Post.find({});
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;