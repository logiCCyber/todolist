import session from "./session.js";
import validator from "./validator.js";
import hashPassword from "./authentication.js";
import database from "./mongoose.js";
import "dotenv/config";
import express from "express";

const Router = express.Router();
Router.use(session);

const auth = {
    username: process.env.LOGIN,
    password: process.env.PASSWORD
}

Router.post("/", (req, res) => {
    if(auth.username === req.body.username && auth.password === req.body.password) {
        req.session.connected = true;
        res.status(200).redirect("/tasks");
    } else {
        res.status(400).json({error: "username or password incorected"});
    }
});

Router.post("/tasks", validator.postValidator, async (req, res) => {
    if(!req.session && req.session.connected) {
        res.redirect("/");
    } else {
        const Error = validator.result(req);
        if(Error.isEmpty()) {
            await database.create({description: req.body.description,
                                   status: req.body.status});
            res.status(201).json(req.body);
        } else {
            res.status(404).json({Error: "json errors"})
        }
    }
});

Router.get("/tasks", async (req, res) => {
    if(!req.session && req.session.connected) {
        res.redirect("/");
    } else {
        const tasks = await database.find();
        res.json(tasks);
    }
});

Router.get("/tasks/:id", async (req, res) => {
    if(req.session && req.session.connected) {
        try {
            const task = await database.findById(req.params.id);
            if(task) {
                return res.status(200).json(task);
            } else {
                throw new Error("Tasks not found");
            }
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    } else {
        res.redirect("/");        
    }
});

Router.put('/tasks/:id', validator.putValidator, async (req, res) => {
    if(req.session && req.session.connected) {
        try {
            const task = await database.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        } else {
            const Error = validator.result(req);
            if(Error.isEmpty()) {
                await database.updateOne({_id: req.params.id}, {$set: {...req.body}});
                res.status(200).json({message: "Task updating"});
            } else {
                res.status(400).json(Error.array());
            }
        }
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    } else {
        res.redirect("/");
    }
});

Router.delete('/tasks/:id', async (req, res) => {
    if(req.session && req.session.connected) {
        try {
            const task = await database.findById(req.params.id);
            if(!task) {
                return res.status(404).json({message: "Task not found"});
            } else {
                await database.deleteOne({_id: req.params.id});
                res.status(200).json({message: "task deleted"});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        res.redirect("/");
    }
});

export default Router;