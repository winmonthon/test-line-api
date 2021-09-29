import TaskModel from "../models/task.schema.js";
import StatusEnum from "../../../common/statusEnum.js";
const TaskService = {
  create(task) {
    return new TaskModel(task).save();
  },
  getAll(task) {
    return TaskModel.find({ dataStatus: StatusEnum.ACTIVE });
  },
  updateTask(id, payload) {
    return TaskModel.findOneAndUpdate({ taskId: id }, payload);
  },
  deleteTask(id, payload) {
    return TaskModel.findOneAndUpdate({ taskId: id }, payload);
  },
  getById(id) {
    return TaskModel.find({ taskId: id });
  },
};

export default TaskService;
