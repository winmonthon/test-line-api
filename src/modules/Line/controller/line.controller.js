import line from "@line/bot-sdk";
import dotenv from "dotenv";
dotenv.config();

const win = "U30918c965c0984fb90f0dca605c61617";
const bam = "Ub271ef8465b45d4059554e9fe5392bc5";

const config = {
  channelAccessToken: process.env.CHANEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANEL_SECRET,
};

const client = new line.Client(config);

const lineController = (event) => {
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
  } else if (event.message.text.startsWith("ชื่อ ")) {
    const payload = {
      type: "text",
      text: `คุณชื่อ ${event.message.text}`,
    };
    return client.replyMessage(event.replyToken, payload);
  }
  const echo = { type: "text", text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
};

export default lineController;
