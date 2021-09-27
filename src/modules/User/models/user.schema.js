import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: Number,
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
    enum: ["sale", "engineer", "supervisor", "admin", "none"],
    default: "none",
  },
  tel: {
    type: String,
    required: true,
  },
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP,
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
