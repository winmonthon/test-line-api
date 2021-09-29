import UserModel from "../models/user.schema.js";
import StatusEnum from "../../../common/statusEnum.js";

const usersService = {
  createUser(payload) {
    return new UserModel(payload).save();
  },
  updateUser(id, payload) {
    return UserModel.findOneAndUpdate({ userId: id }, payload);
  },
  getAllUsers() {
    return UserModel.find({ dataStatus: StatusEnum.ACTIVE });
  },
  deleteUser(id, payload) {
    return UserModel.findOneAndUpdate({ userId: id }, payload);
  },
  login(name) {
    return UserModel.find({ name: name });
  },
};

export default usersService;
