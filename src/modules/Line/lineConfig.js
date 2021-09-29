import dotenv from "dotenv";
dotenv.config();

const lineConfig = {
  channelAccessToken: process.env.CHANEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANEL_SECRET,
};

export default lineConfig;
