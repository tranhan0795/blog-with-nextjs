const router = require("express").Router();
const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require("bcrypt");

//update
router.post("/update", async (req, res) => {
    if (req.body.username == req.session.username) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findOneAndUpdate(req.body.username, {
                $set: {
                    password: req.body.password,
                    photo: req.body.photo
                }
            }, {
                new: true
            });
            res.status(200).json(updatedUser);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(401).json("You can only update your account!");
    }
})


//delete
router.delete("/", async (req, res) => {
    if (req.body.username == req.session.username) {
        try {
            const user = await User.find({username: req.params.name});
            if (!user) {
                res.status(404).json("Can't find user");
                return;
            }
            try {
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted");
            } catch (e) {
                res.status(500).json(e);
            }
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(401).json("You can't delete this account!");
    }
})


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...otherInfo} = user._doc;
        res.status(200).json(otherInfo);
    } catch (e) {
        res.status(500).json(e);
    }
})


module.exports = router; 