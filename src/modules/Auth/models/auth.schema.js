import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  tel: {
    type: String,
    required: true,
  },
  uid: {
    type: Number,
    required: true,
  },
  password: {
    type: String, // MD5
    required: true,
  },
});

const Authmodel = mongoose.model("Auth", AuthSchema);
export default Authmodel;
