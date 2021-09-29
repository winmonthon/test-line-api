import express from "express";
import TaskController from "./controller/task.controller.js";

const router = express.Router();

//Create task
router.post("/", TaskController.createTaskFromSale);
//See all task
router.get("/", TaskController.getAllTask);
//SV assign task and Engineer update status
router.put("/:id", TaskController.updateTask);
//Delete task
router.delete("/:id", TaskController.deleteTask);
//See one task
router.get("/:id", TaskController.getTaskById);

export default router;
