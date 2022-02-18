const router = require('express').Router();
const User = require('../model/User.js');
const bcrypt = require('bcrypt');

//register
router.post("/register", async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (e) {
        res.status(500).json(e);
    }
})

//login
router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).json("wrong username or password!");
            return;
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json("wrong username or password!");
            return;
        }
        req.session.username = user.username;
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
})


//logout
router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.status(200).json(err);
        }else{
            res.status(200).json(true);

        }
    })
})


//check login status
router.post("/checklogin", async (req, res) => {
    if (req.session.username === req.body.username) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }


})

module.exports = router;