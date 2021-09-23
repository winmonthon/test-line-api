"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
const taskController = require("./controller/task.controller");

// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "Q4b+wmv9dBIZxyoM7/vqvfINbBIcrEQShuMCTXZ23ZpOqakgAeVF6RSI9qHQ/aT7LgfFAdWT/7Fp8O44V9bjq5mf7yfk5A4hsQIWOqMNLz7wK2M30MlH47ktf43vxYnPy9p7SgpQRm4hSwVP43rclgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "bea26cdbe9c077b37770ad69ab939ef4",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(taskController))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
//function handleEvent(event)

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
