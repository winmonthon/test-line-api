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
const win = "U30918c965c0984fb90f0dca605c61617";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Line handle
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

//Task
app.use("/task", TaskRouter);
//Users
app.use("/users", UsersRoter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
