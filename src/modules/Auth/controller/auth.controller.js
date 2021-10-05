import AuthService from '../services/auth.service.js'
import UsersService from '../../User/services/users.services.js'
import { createToken } from '../../../middlewares/authentication.js'
import StatusEnum from '../../../common/statusEnum.js'
import dotenv from 'dotenv'
dotenv.config()
import md5 from 'md5'

const authController = {
  async createAuth(req, res) {
    const { tel, uid, password } = req.body
    const created = await AuthService.create({
      tel,
      uid,
      password,
    })
    res.json({
      success: true,
      data: created,
    })
  },
  async login(req, res) {
    const { tel, password } = req.body

    //TODO: add try catch
    //TODO: change lineUId to lineUid cause !!!humps!!
    //TODO:
    const checked = await AuthService.check({
      tel,
      password: md5(`${password}${process.env.SALT}`),
    })

    if (checked.length !== 0) {
      const found = await UsersService.login(tel)
      const token = createToken({
        name: found[0].name,
        role: found[0].role,
        userId: found[0].userId,
        lineUid: found[0].lineUid,
      })
      res.status(200).json({
        success: true,
        data: {
          user: found,
          token,
        },
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'tel or password is wrong',
      })
    }
  },
  async getAll(req, res) {
    res.json({
      success: true,
      data: await AuthService.getAllAuth(),
    })
  },
  async update(req, res) {
    const { userId } = req.params
    const { tel, password } = req.body
    const updated = await AuthService.updateAuth(userId, {
      tel,
      password,
    })
    res.json({
      success: true,
      data: updated,
    })
  },
  async delete(req, res) {
    const { userId } = req.params
    const { status = StatusEnum.DELETED } = req.body
    const deleted = await AuthService.deleteAuth(userId, { status })

    res.json({
      success: true,
      data: deleted,
    })
  },
}

export default authController
