import session from "express-session";
import crypto from "crypto";

export default session({
    secret: crypto.randomBytes(16).toString("hex"),
    cookie: {
        maxAge: 360000
    }, 
    resave: false,
    saveUninitialized: true
});
