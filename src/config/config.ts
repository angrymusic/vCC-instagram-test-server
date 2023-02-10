import dotenv from "dotenv";
dotenv.config();

const config = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_DBNAME || "test",
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
    },
};

export default config;
