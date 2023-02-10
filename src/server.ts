import express from "express";
import sequelzie from "./models/index";
import { Users } from "./models/user";
const app = express();
const port = 8090;

// Users.create({title:"title1",context:"context1",img:"img1"});

app.get("/", (req, res) => {
    
});
app.listen(port, async () => {
    console.log("server is running on " + port);
    await sequelzie
        .authenticate()
        .then(async () => {
            console.log("db connection success");
        })
        .catch((e) => {
            console.log(e);
        });
});
