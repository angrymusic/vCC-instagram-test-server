import express from "express";
import sequelzie from "./models/index";
const multer = require("multer");
import { Users } from "./models/user";
const cors = require("cors");
const app = express();
const port = 8090;
let corsOptions = {
    origin: "*", // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(express.json()); //j
app.use(cors(corsOptions));
// Users.create({title:"title1",context:"context1",img:"img1"});



app.use("/upload", express.static("upload"));
app.get("/", (req, res) => {
    const list = Users.findAll();
    console.log(list);
});
app.post("/add",  (req, res) => {
    console.log(req.body.file);
    res.json(true);
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
