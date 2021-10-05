import TaskModel from '../models/task.schema.js'
import StatusEnum from '../../../common/statusEnum.js'

const TaskService = {
  create(task) {
    return new TaskModel(task).save()
  },
  getAll(task) {
    return TaskModel.find({ status: StatusEnum.ACTIVE })
  },
  updateTask(id, payload) {
    return TaskModel.findOneAndUpdate({ taskId: id }, payload)
  },
  deleteTask(id, payload) {
    return TaskModel.findOneAndUpdate({ taskId: id }, payload)
  },
  getById(id) {
    return TaskModel.findOne({ taskId: id })
  },
  getBySale(userId) {
    return TaskModel.find({ 'createBy.userId': userId })
  },
  assignTask(taskId, payload) {
    return TaskModel.findOneAndUpdate({ taskId }, payload)
  },
  getBySupervisor(userId) {
    return TaskModel.find({
      'assignBy.userId': userId,
      status: StatusEnum.ACTIVE,
    })
  },
  getByEngineer(userId) {
    return TaskModel.find({
      'assignTo.userId': userId,
      status: StatusEnum.ACTIVE,
    })
  },
}

export default TaskService
