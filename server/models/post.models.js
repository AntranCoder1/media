const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    picture: {
        type: String,
    },
    video: {
        type: String,
    },
    likers: {
        type: [String],
        required: true,
    },
    comments: {
        type: [
            {
                commenterId:String,
                commenterUsername: String,
                text: String,
                timestamp: Number,
            }
        ],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);