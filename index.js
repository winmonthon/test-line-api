"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

const win = "U30918c965c0984fb90f0dca605c61617";

const config = {
  channelAccessToken:
    "Q4b+wmv9dBIZxyoM7/vqvfINbBIcrEQShuMCTXZ23ZpOqakgAeVF6RSI9qHQ/aT7LgfFAdWT/7Fp8O44V9bjq5mf7yfk5A4hsQIWOqMNLz7wK2M30MlH47ktf43vxYnPy9p7SgpQRm4hSwVP43rclgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "bea26cdbe9c077b37770ad69ab939ef4",
};

const client = new line.Client(config);

const app = express();

app.post("/callback", line.middleware(config), async (req, res) => {
  await handleEvent(req.body.events[0])
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const handleEvent = (event) => {
  if (event.message.text === "get user id") {
    const payload = {
      type: "text",
      text: `${event.source.userId}`,
    };
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.text === "test push") {
    const payload = {
      type: "text",
      text: "message from test push message",
    };
    return client.pushMessage(win, payload);
  } else {
    const echo = { type: "text", text: event.message.text };
    return client.replyMessage(event.replyToken, echo);
  }
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
