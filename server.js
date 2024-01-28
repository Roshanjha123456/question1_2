import { MongoClient } from "mongodb";
import { app } from "./app.js";

const port = 9000;
export const dbName = "myusers";
const mongoURI = "mongodb://127.0.0.1:27017/";
export const client = new MongoClient(mongoURI);

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
