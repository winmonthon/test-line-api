import JWT from "jsonwebtoken";
import RoleEnum from "../common/roleEnum.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = ({ name, role, lineUId }) =>
  JWT.sign(
    {
      name,
      role,
      lineUId,
    },
    SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

export const adminAuthentication = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

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

export const engineerAuthentication = (req, res, next) => {
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

  const validateRole = decoded.role !== RoleEnum.ENGINEER;

  if (token && validateRole) {
    return res.status(401).json({
      success: false,
      message: "Role Unauthorized",
    });
  }

  next();
};

export const supervisorAuthentication = (req, res, next) => {
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

  const validateRole = decoded.role !== RoleEnum.SUPERVUSOR;

  if (token && validateRole) {
    return res.status(401).json({
      success: false,
      message: "Role Unauthorized",
    });
  }

  next();
};

export const saleAuthentication = (req, res, next) => {
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

  const validateRole = decoded.role !== RoleEnum.SALE;

  if (token && validateRole) {
    return res.status(401).json({
      success: false,
      message: "Role Unauthorized",
    });
  }

  next();
};
