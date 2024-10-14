import express from "express"
import 'dotenv/config'
import { Parameters } from "./utils/constans";
import { initDatabase } from "./config/database/database";
import { router } from "./infrastructure/httpAdapter/requestAdapter";

const PORT = 3025
const app = express();
app.use(express.json());
app.use("/events", router);


app.listen(PORT, async ()=>{
    console.log("Server running at port", Parameters.DB_PORT);
    const url_database = 'mongodb://' + Parameters.DB_HOST + ':' + Parameters.DB_PORT + '/' + Parameters.DB_NAME;
    await initDatabase(url_database);
})

