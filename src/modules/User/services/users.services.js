import UserModel from '../models/user.schema.js'
import StatusEnum from '../../../common/statusEnum.js'
import { query } from 'express'

const usersService = {
  createUser(payload) {
    return new UserModel(payload).save()
  },
  updateUser(userId, payload) {
    return UserModel.findOneAndUpdate({ userId }, payload)
  },
  getAllUsers() {
    return UserModel.find({ status: StatusEnum.ACTIVE })
  },
  deleteUser(userId, payload) {
    return UserModel.findOneAndUpdate({ userId }, payload)
  },
  login(tel) {
    return UserModel.find({ tel })
  },
  getByUserId(userId) {
    return UserModel.findOne({ userId, status: StatusEnum.ACTIVE })
  },
}

export default usersService
