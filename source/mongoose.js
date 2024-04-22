import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/todolist");

const db = new mongoose.Schema({
    description: String,
    status: String,
}, { timestamps: true });

export default mongoose.model("todos", db);