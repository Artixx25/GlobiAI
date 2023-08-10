import mongoose from "mongoose";

const Post = new mongoose.Schema({
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
    username: {type: String, required: true},
    postUserId: {type: String, required: true},
    userImage: {type: String},
    likes: {type: Map, of: Boolean}
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;