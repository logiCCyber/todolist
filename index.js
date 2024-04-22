import hashPassword from "./source/authentication.js";
import session from "./source/session.js";
import database from "./source/mongoose.js";
import validator from "./source/validator.js";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

console.log(validator.postValidator);

app.post('/', validator.postValidator, (req, res) => {
    const result = validator.result(req);
    if(!result.isEmpty()) {
        res.send(result.array());
    } else {
        res.json(req.body);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log('Server is started in port: ' + PORT);
});



