import UsersService from '../services/users.services.js'
import shortid from 'shortid'
import StatusEnum from '../../../common/statusEnum.js'
import AuthService from '../../Auth/services/auth.service.js'
import { createToken } from '../../../middlewares/authentication.js'

import md5 from 'md5'
import dotenv from 'dotenv'
dotenv.config()

const createId = shortid.generate()

const usersController = {
  async createNewUser(req, res) {
    const {
      userId = createId,
      name,
      lineUid,
      role,
      tel,
      status,
      password,
    } = req.body

    const created = await UsersService.createUser({
      userId,
      name,
      lineUid,
      role,
      tel,
      status,
    })

    await AuthService.create({
      password: md5(`${password}${process.env.SALT}`),
      tel,
      userId,
    })
    res.json({
      success: true,
      data: created,
    })
  },
  async updateUser(req, res) {
    const { userId } = req.params
    const { name, lineUid, role, tel } = req.body
    const updated = await UsersService.updateUser(userId, {
      name,
      lineUid,
      role,
      tel,
    })
    await AuthService.updateAuth(userId, { tel })
    res.json({
      success: true,
      data: updated,
    })
  },
  async getAllUsers(req, res) {
    const { page = 1, size = 10 } = req.query

    const calSkip = (page, size) => {
      return (page - 1) * size
    }
    const calPage = (count, size) => {
      return Math.ceil(count / size)
    }

    const results = await UsersService.getAllUsers()
      .skip(calSkip(page, size))
      .limit(parseInt(size))
      .exec()

    const count = await UsersService.getAllUsers().countDocuments().exec()

    res.status(200).json({
      success: true,
      currentPage: page,
      allPages: calPage(count, size),
      currentCount: results.length,
      totalCount: count,
      data: results,
    })
  },
  async deleteUser(req, res) {
    const { userId } = req.params
    const { status = StatusEnum.DELETED } = req.body
    const deleted = await UsersService.deleteUser(userId, { status })

    res.json({
      success: true,
      data: deleted,
    })
  },
}

export default usersController
