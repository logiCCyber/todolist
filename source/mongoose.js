import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users");

const db = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    }
});

export default mongoose.model("pers", db);