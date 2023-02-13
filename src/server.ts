import express from "express";
import sequelzie from "./models/index";
import multer from "multer";
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
interface dataType {
    title: string
    context: string
    img: string
  }
// Users.create({title:"title1",context:"context1",img:"img1"});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../upload"); // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
        const date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        let timeString: string =
            "" +
            date.getFullYear() +
            (month >= 10 ? month : "0" + month) +
            (day >= 10 ? day : "0" + day) +
            (hour >= 10 ? hour : "0" + hour) +
            (minute >= 10 ? minute : "0" + minute) +
            (second >= 10 ? second : "0" + second);

        const fileName = req.body.name + "-" + timeString + "-" + file.originalname;
        cb(null, fileName); //파일 이름 설정
        Users.create({ name: req.body.name, title: req.body.title, context: req.body.context, img: fileName });
    },
});
const fileFilter = (req: any, file: any, cb: any) => {
    // mime type 체크하여 원하는 타입만 필터링

    if (file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb({ msg: "png 파일만 업로드 가능합니다." }, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use("/upload", express.static("upload"));
app.get("/", async (req, res) => {
    let imgs: dataType[] = [];
    const list = Users.findAll({ where: { name: "angrymusic" } });
    await list.then((res) => {
        for (let i = 0; i < res.length; i++) {
            imgs.push(res[i].dataValues);
        }
    });
    res.send(imgs);
});
app.post("/add", upload.single("file"), (req, res, next) => {
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
