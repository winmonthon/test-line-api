import UserModel from "../../User/models/user.schema.js";
import AuthModel from "../models/auth.schema.js";
import StatusEnum from "../../../common/statusEnum.js";

const authService = {
  create(payload) {
    return new AuthModel(payload).save();
  },
  //TODO: use query
  check(payload) {
    return AuthModel.find(payload);
  },
  login(tel) {
    return UserModel.find({ tel });
  },
  getAllAuth() {
    return AuthModel.find({ status: StatusEnum.ACTIVE });
  },
  updateAuth(id, payload) {
    return AuthModel.findByIdAndUpdate({ _id: id }, payload);
  },
  deleteAuth(id, payload) {
    return AuthModel.findOneAndUpdate({ _id: id }, payload);
  },
};

export default authService;
