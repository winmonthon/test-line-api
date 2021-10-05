import AuthModel from '../models/auth.schema.js'
import StatusEnum from '../../../common/statusEnum.js'

const authService = {
  create(payload) {
    return new AuthModel(payload).save()
  },
  //TODO: use query
  check(payload) {
    return AuthModel.find(payload)
  },
  getAllAuth() {
    return AuthModel.find({ status: StatusEnum.ACTIVE })
  },
  updateAuth(userId, payload) {
    return AuthModel.findOneAndUpdate({ userId }, payload)
  },
  deleteAuth(userId, payload) {
    return AuthModel.findOneAndUpdate({ userId }, payload)
  },
}

export default authService
