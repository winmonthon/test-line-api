import line from "@line/bot-sdk";
import LineConfig from "../lineConfig.js";
import dotenv from "dotenv";
dotenv.config();

const win = "U30918c965c0984fb90f0dca605c61617";
const bam = "Ub271ef8465b45d4059554e9fe5392bc5";

const client = new line.Client(LineConfig);

const LineController = {
  async handleEvent(req, res) {
    const event = req.body.events[0];
    const echo = { type: "text", text: event.message.text };
    //res.status(200).json({ text: "sdfsf" });
    return client.replyMessage(event.replyToken, echo);
  },
};

export default LineController;
