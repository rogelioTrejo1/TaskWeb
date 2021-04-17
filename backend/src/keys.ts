// Variables de entorno
import { config } from "dotenv";
config();

const keys = {
    node_env: process.env.NODE_ENV || "",
    portServer: process.env.PORT || 3500,
    database: {
        username: process.env.DB_USERNAME || "root",
        passsword: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "task-web",
        uri: process.env.DB_URL || "mysql://root:@localhost/task-web",
    }
};

export default keys;