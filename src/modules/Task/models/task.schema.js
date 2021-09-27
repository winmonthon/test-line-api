import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  dueDate: {
    type: Datetime,
    default: null,
  },
  assignBy: {
    // Supervisor
    type: UserSchema,
    default: null,
  },
  createBy: {
    // Sale
    type: UserSchema,
    default: null,
  },
  engineer: {
    // Engineer
    type: UserSchema,
    default: null,
  },
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP,
});

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
