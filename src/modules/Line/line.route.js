import express from "express";
import line from "@line/bot-sdk";
import LineController from "./controller/line.controller.js";

import LineConfig from "./lineConfig.js";

const router = express.Router();

router.post("/", line.middleware(LineConfig), LineController.handleEvent);

export default router;
