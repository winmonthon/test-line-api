import mongoose from "mongoose";
import StatusEnum from "../../../common/statusEnum.js";
import autoIncrement from "mongoose-auto-increment";
import RoleEnum from "../../../common/roleEnum.js";

const UserSchema = new mongoose.Schema(
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
  { timestamps: true, strict: true }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
