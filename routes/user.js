import express from "express";
import { dbName, client } from "../server.js";
import md5 from "md5";
import { inserUsers, avergeAge } from "../controllers/users.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hii my self roshan");
});

router.post("/insertUsers", inserUsers);

router.get("/averageAge", avergeAge);

export default router;
