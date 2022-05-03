import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import {createConnection} from "./config/connect";
import { Users } from "./models/users";

const app: Express = express();
const port = process.env.PORT || 8000;
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createConnection();
app.post("/", async (req, _res) => {
  const {username, password} = req.body;
  try {
    console.log({username, password});
    const jane = await Users.create({ username, password});
    console.log(jane)
  }catch(e){
    console.log(e)
  }
 
  // console.log("Jane's auto-generated ID:", jane.id);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
