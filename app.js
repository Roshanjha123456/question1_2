import express from "express";

import useRouter from "./routes/user.js";

export const app = express();

app.use(express.json());
app.use(useRouter);
