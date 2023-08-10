import mongoose, { connect } from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('DB connected'))
        .catch(e => console.log(e))
}

export default connectDB;