"use strict";
import mongoose from "mongoose";
import line from "@line/bot-sdk";
//import autoIncrement from "mongoose-auto-increment";
import express from "express";
import TaskRouter from "./src/modules/Task/task.route.js";
import UsersRoter from "./src/modules/User/user.router.js";
import LineController from "./src/modules/Line/controller/line.controller.js";

import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
  });

const config = {
  channelAccessToken: process.env.CHANEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANEL_SECRET,
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Line handle
app.post("/callback", line.middleware(config), async (req, res) => {
  await LineController(req.body.events);
});

//Task
app.use("/task", TaskRouter);
//Users
app.use("/users", UsersRoter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
