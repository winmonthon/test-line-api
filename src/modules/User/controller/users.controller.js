import humps from "humps";
import UsersService from "../services/users.services.js";
import shortid from "shortid";
import StatusEnum from "../../../common/statusEnum.js";
import usersService from "../services/users.services.js";
import { createToken } from "../../../middlewares/authentication.js";

const createId = shortid.generate();

const usersController = {
  async createNewUser(req, res) {
    const {
      userId = createId,
      name,
      lineUid,
      role,
      tel,
      dataStatus,
    } = req.body;
    const created = await UsersService.createUser({
      userId,
      name,
      lineUid,
      role,
      tel,
      dataStatus,
    });
    res.json({
      success: true,
      data: created,
    });
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { name, lineUid, role, tel } = req.body;
    const updated = await UsersService.updateUser(id, {
      name,
      lineUid,
      role,
      tel,
    });
    res.json({
      success: true,
      data: updated,
    });
  },
  async getAllUsers(req, res) {
    res.json({
      success: true,
      data: await UsersService.getAllUsers(),
    });
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    const { dataStatus = StatusEnum.DELETED } = req.body;
    const deleted = await UsersService.deleteUser(id, { dataStatus });

    res.json({
      success: true,
      data: deleted,
    });
  },
  async login(req, res) {
    const { name } = req.body;
    const found = await usersService.login(name);

    if (found.length !== 0) {
      const token = createToken({
        name: found[0].name,
        role: found[0].role,
        userId: found[0].userId,
      });

      res
        .json({
          success: true,
          data: {
            user: found,
            token,
          },
        })
        .status(200);
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  },
};

export default usersController;
