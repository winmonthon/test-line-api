import line from "@line/bot-sdk";
import LineConfig from "../lineConfig.js";
import dotenv from "dotenv";
import flex1 from "../flex/flex1.js";
import flex2 from "../flex/flex2.js";

dotenv.config();

const win = "U30918c965c0984fb90f0dca605c61617";
const bam = "Ub271ef8465b45d4059554e9fe5392bc5";
const Ppong = "Ua58ce1cc835b80f3b2a93f2cd35172a2";

const client = new line.Client(LineConfig);

const LineController = {
  async handleEvent(req, res) {
    let payload = {};
    const event = req.body.events[0];
    const { text } = event.message || "";

    switch (text) {
      case "เพิ่มงานใหม่":
        payload = {
          type: "text",
          text: `กรุณากรอกชื่องานโดยขึ้นต้นด้วยคำว่า "งานใหม่" ตัวอย่าง "งานใหม่ Task one "`,
        };
        console.log(event.source.userId);
        return client.replyMessage(event.replyToken, payload);

      case "test push":
        return client.pushMessage(win, flex1);

      case "test carousel":
        return client.replyMessage(event.replyToken, flex2);

      default:
        if (text.startsWith("งานใหม่")) {
          payload = {
            type: "text",
            text,
          };
          return client.pushMessage(Ppong, payload);
        } else {
          return client.replyMessage(event.replyToken, payload);
        }
    }
  },
};

export default LineController;
