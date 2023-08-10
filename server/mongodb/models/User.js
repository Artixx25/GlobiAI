import {Schema, model} from "mongoose"

const User = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true},
    userImage: {type: String, required: true},
    coverImage: {type: String},
    password: {type: String, required: true},
    google: {type: Boolean}
})

export default model('User', User)