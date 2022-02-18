const multer = require('multer');
const router = require("express").Router();
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'backend/images');
    }, filename: (req, file, callback) => {
        callback(null, req.body.name);
    }
})

const upload = multer({storage: storage});


router.post('/upload', upload.single("file"), (req, res) => {
    res.status(200).json("File has been up loaded");
})

router.post('/delete', (req, res) => {
    fs.unlink("/backend/images" + req.body.photo, e => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json("photo has been deleted.");
        }
    })
})


module.exports = router;

