import session from "./source/session.js";
import validator from "./source/validator.js";
import hashPassword from "./source/authentication.js";
import database from "./source/mongoose.js";
import "dotenv/config";
import express from "express";

const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("index");
});

export default Router;