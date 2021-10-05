import mongoose from "mongoose";
import StatusEnum from "../../../common/statusEnum.js";

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  tel: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String, // MD5
    required: true,
  },
  status: {
    type: String,
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  },
});

const Authmodel = mongoose.model("auth", AuthSchema);
export default Authmodel;
