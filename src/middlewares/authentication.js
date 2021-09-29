import JWT from "jsonwebtoken";
import RoleEnum from "../common/roleEnum.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = ({ name, role, userId }) =>
  JWT.sign(
    {
      name,
      role,
      userId,
    },
    SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

export const userAuthentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token require",
    });
  }

  const decoded = JWT.decode(token, SECRET_KEY);

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.status(401).json({
      success: false,
      message: "token expired",
    });
  }

  const validateRole = !Object.values(RoleEnum).some(
    (role) => role === decoded.role
  );

  if (token && validateRole) {
    return res.status(401).json({
      success: false,
      message: "Role Unauthorized",
    });
  }

  next();
};

export const adminAuthentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token require",
    });
  }

  const decoded = JWT.decode(token, SECRET_KEY);

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.status(401).json({
      success: false,
      message: "token expired",
    });
  }

  const validateRole = decoded.role !== RoleEnum.ADMIN;

  if (token && validateRole) {
    return res.status(401).json({
      success: false,
      message: "Role Unauthorized",
    });
  }

  next();
};
