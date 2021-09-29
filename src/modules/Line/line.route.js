import express from "express";
import LineController from "./controller/line.controller.js";

const router = express.Router();

//Create task
router.post("/", LineController);

export default router;
