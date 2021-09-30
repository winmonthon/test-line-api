import express from "express";
import AuthController from "./controller/auth.controller.js";
import { adminAuthentication } from "../../middlewares/authentication.js";

const router = express.Router();

//Create
router.post("/", AuthController.createAuth);
//Get Auth
router.get("/", AuthController.getAll);
//Update Auth
router.put("/:id", AuthController.update);
//delete Auth
router.delete("/:id", AuthController.delete);

export default router;
