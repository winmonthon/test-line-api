import humps from 'humps'
import JWT from 'jsonwebtoken'
import TaskService from '../services/task.service.js'
import shortid from 'shortid'
import StatusEnum from '../../../common/statusEnum.js'
import dotenv from 'dotenv'
import UsersService from '../../User/services/users.services.js'

dotenv.config()

const createId = shortid.generate()

const taskController = {
  async createTaskFromSale(req, res) {
    const SECRET_KEY = process.env.SECRET_KEY
    const token = req?.headers?.authorization?.split(' ')[1]
    const decoded = JWT.decode(token, SECRET_KEY)

    const creator = await UsersService.getByUserId(decoded.userId)

    const {
      title,
      description,
      dueDate,
      createBy = creator,
      taskId = createId,
    } = req.body

    const results = await TaskService.create({
      title,
      description,
      dueDate,
      createBy,
      taskId,
    })

    res.json({
      succes: true,
      data: results,
    })
  },
  async getAllTask(req, res) {
    const { page = 1, size = 10 } = req.query

    const calSkip = (page, size) => {
      return (page - 1) * size
    }
    const calPage = (count, size) => {
      return Math.ceil(count / size)
    }

    const results = await TaskService.getAll()
      .skip(calSkip(page, size))
      .limit(parseInt(size))
      .exec()

    const count = await TaskService.getAll().countDocuments().exec()

    res.status(200).json({
      success: true,
      currentPage: page,
      allPages: calPage(count, size),
      currentCount: results.length,
      totalCount: count,
      data: results,
    })
  },
  //Assign  Update here
  async updateTask(req, res) {
    const { taskId } = req.params
    const { assignBy, engineer, taskStatus, title, description, dueDate } =
      humps.camelizeKeys(req.body)
    const updated = await TaskService.updateTask(taskId, {
      title,
      description,
      dueDate,
      assignBy,
      engineer,
      taskStatus,
    })

    res.json({
      succes: true,
      data: updated,
    })
  },
  //delete task
  async deleteTask(req, res) {
    const { id } = req.params
    const { status = StatusEnum.DELETED } = humps.camelizeKeys(req.body)
    const deleted = await TaskService.updateTask(id, {
      status,
    })

    res.json({
      succes: true,
      data: deleted,
    })
  },
  //get task by id
  async getTaskById(req, res) {
    const { id } = req.params
    console.log(id)
    const founed = await TaskService.getById(id)

    res.json({
      succes: true,
      data: founed,
    })
  },
  //get task by user id
  async getTaskBySale(req, res) {
    const { userId } = req.params
    const { page = 1, size = 10 } = req.query

    const calSkip = (page, size) => {
      return (page - 1) * size
    }
    const calPage = (count, size) => {
      return Math.ceil(count / size)
    }

    const founed = await TaskService.getBySale(userId)
      .skip(calSkip(page, size))
      .limit(parseInt(size))
      .exec()

    const count = await TaskService.getBySale(userId).countDocuments().exec()

    res.status(200).json({
      success: true,
      currentPage: page,
      allPages: calPage(count, size),
      currentCount: founed.length,
      totalCount: count,
      data: founed,
    })
  },
  async assignTask(req, res) {
    const SECRET_KEY = process.env.SECRET_KEY
    const token = req?.headers?.authorization?.split(' ')[1]
    const decoded = JWT.decode(token, SECRET_KEY)

    const assigner = await UsersService.getByUserId(decoded.userId)

    const { taskId } = req.params
    const { assignBy = assigner, engineer } = humps.camelizeKeys(req.body)

    const assginTo = await UsersService.getByUserId(engineer)

    const assinged = await TaskService.assignTask(taskId, {
      assignBy,
      engineer: assginTo,
    })

    res.json({
      succes: true,
      data: assinged,
    })
  },
  async getTaskBySupervisor(req, res) {
    const { userId } = req.params
    const { page = 1, size = 10 } = req.query

    const calSkip = (page, size) => {
      return (page - 1) * size
    }
    const calPage = (count, size) => {
      return Math.ceil(count / size)
    }

    const founed = await TaskService.getBySupervisor(userId)
      .skip(calSkip(page, size))
      .limit(parseInt(size))
      .exec()

    const count = await TaskService.getBySupervisor(userId)
      .countDocuments()
      .exec()

    res.status(200).json({
      success: true,
      currentPage: page,
      allPages: calPage(count, size),
      currentCount: founed.length,
      totalCount: count,
      data: founed,
    })
  },
  async getTaskByEngineer(req, res) {
    const { userId } = req.params
    const { page = 1, size = 10 } = req.query

    const calSkip = (page, size) => {
      return (page - 1) * size
    }
    const calPage = (count, size) => {
      return Math.ceil(count / size)
    }

    const founed = await TaskService.getByEngineer(userId)
      .skip(calSkip(page, size))
      .limit(parseInt(size))
      .exec()

    const count = await TaskService.getByEngineer(userId)
      .countDocuments()
      .exec()

    res.status(200).json({
      success: true,
      currentPage: page,
      allPages: calPage(count, size),
      currentCount: founed.length,
      totalCount: count,
      data: founed,
    })
  },
}

export default taskController
