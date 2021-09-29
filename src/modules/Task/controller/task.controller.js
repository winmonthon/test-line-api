import humps from "humps";
import TaskService from "../services/task.service.js";
import shortid from "shortid";
import StatusEnum from "../../../common/statusEnum.js";

const createId = shortid.generate();

const taskController = {
  async createTaskFromSale(req, res) {
    const {
      title,
      description,
      dueDate,
      createBy,
      taskId = createId,
    } = req.body;

    res.json({
      succes: true,
      data: await TaskService.create({
        title,
        description,
        dueDate,
        createBy,
        taskId,
      }),
    });
  },
  async getAllTask(req, res) {
    res.json({
      succes: true,
      data: await TaskService.getAll(),
    });
  },
  //Assign  Update here
  async updateTask(req, res) {
    const { id } = req.params;
    const { assignBy, engineer, taskStatus } = humps.camelizeKeys(req.body);
    const updated = await TaskService.updateTask(id, {
      assignBy,
      engineer,
      taskStatus,
    });

    res.json({
      succes: true,
      data: updated,
    });
  },
  //delete task
  async deleteTask(req, res) {
    const { id } = req.params;
    const { dataStatus = StatusEnum.DELETED } = humps.camelizeKeys(req.body);
    const deleted = await TaskService.updateTask(id, {
      dataStatus,
    });

    res.json({
      succes: true,
      data: deleted,
    });
  },
  //get task by id
  async getTaskById(req, res) {
    const { id } = req.params;
    const founed = await TaskService.getById(id);

    res.json({
      succes: true,
      data: founed,
    });
  },
};

export default taskController;
