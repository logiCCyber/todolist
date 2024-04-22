import express from "express";
import Router from "./source/routers.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(Router);


app.listen(PORT, () => {
     console.log('Server is started in port: ' + PORT);
});



