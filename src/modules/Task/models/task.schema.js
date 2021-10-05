import mongoose from "mongoose";
import StatusEnum from "../../../common/statusEnum.js";
import RoleEnum from "../../../common/roleEnum.js";
import autoIncrement from "mongoose-auto-increment";

const UserField = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lineUid: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.NONE,
    },
    tel: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: StatusEnum,
      default: StatusEnum.ACTIVE,
    },
  },
  { _id: false, strict: true }
);

const TaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
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
      type: Date,
      default: null,
    },
    assignBy: {
      // Supervisor
      type: UserField,
      default: null,
    },
    createBy: {
      // Sale
      type: UserField,
      default: null,
    },
    engineer: {
      // Engineer
      type: UserField,
      default: null,
    },

    taskStatus: {
      type: String,
      enum: ["progress", "pending", "resolved"],
      default: "pending",
    },
    status: {
      type: String,
      enum: StatusEnum,
      default: StatusEnum.ACTIVE,
    },
  },
  { timestamps: true, strict: true }
);

const TaskModel = mongoose.model("task", TaskSchema);
export default TaskModel;
