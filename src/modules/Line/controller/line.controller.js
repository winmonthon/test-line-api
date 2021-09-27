const line = require("@line/bot-sdk");

const win = "U30918c965c0984fb90f0dca605c61617";
const bam = "Ub271ef8465b45d4059554e9fe5392bc5";

const config = {
  channelAccessToken:
    "Q4b+wmv9dBIZxyoM7/vqvfINbBIcrEQShuMCTXZ23ZpOqakgAeVF6RSI9qHQ/aT7LgfFAdWT/7Fp8O44V9bjq5mf7yfk5A4hsQIWOqMNLz7wK2M30MlH47ktf43vxYnPy9p7SgpQRm4hSwVP43rclgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "bea26cdbe9c077b37770ad69ab939ef4",
};

const client = new line.Client(config);

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

module.export = handleEvent;
