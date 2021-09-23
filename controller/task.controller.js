const line = require("@line/bot-sdk");
const express = require("express");

const taskController = {
  replyTest(event) {
    if (event.type !== "message" || event.message.type !== "text") {
      // ignore non-text-message event
      return Promise.resolve(null);
    } else if (
      event.message.type === "message" ||
      event.message.text === "hello"
    ) {
      const payload = {
        type: "text",
        text: "hello from Heroku Server",
      };
      return client.replyMessage(event.replyToken, payload);
    } else if (event.message.text === "เพิ่มงานใหม่") {
      const payload = {
        type: "text",
        text: "ต้องการเพิ่มงานอะไรครับ",
      };
      return client.replyMessage(event.replyToken, payload);
    }

    // create a echoing text message
    const echo = { type: "text", text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
  },
};

module.exports = taskController;
