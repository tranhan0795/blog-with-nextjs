const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, content: {
        type: String,
        required: true
    }, photo: {
        type: String,
        required: false
    },username:{
        type:String,
        required:true
    },categories:{
        type:Array,
        required:false
    }
}
    , {
        timestamps: true
    })

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;