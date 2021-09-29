"use strict";
import mongoose from "mongoose";

//import autoIncrement from "mongoose-auto-increment";
import express from "express";
import TaskRouter from "./src/modules/Task/task.route.js";
import UsersRoter from "./src/modules/User/user.router.js";
import LineRouter from "./src/modules/Line/line.route.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
  });

const app = express();
app.use(express.urlencoded({ extended: true }));

//Line handle
app.use("/callback", LineRouter);

app.use(express.json()); //!!!!!!!!!!!!!alway must use it before Line handle!!!!!!!!!!!!!!!
//Task
app.use("/task", TaskRouter);
//Users
app.use("/users", UsersRoter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
