import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import Employee from "../models/employee.model";
import InternalServerError from "../util/appErrors/errors/internalServer.error";
import UnAuthorize from "../util/appErrors/errors/unauthorize.error";
import logger from "../util/logger";

export function isLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const tokenString = request.header("Authorization");
    if (!tokenString) throw new UnAuthorize("No token provided!");
    const token = tokenString.replace("Bearer ", "");
    if (!token) {
      throw new UnAuthorize("No token provided!");
    }
    jwt.verify(token, "hieulaiminh", (err, decoded) => {
      if (err || !decoded) {
        return response.status(401).send({ message: err });
      }
      request.body["loginUser"] = decoded;
      console.log("A");
      next();
    });
  } catch (error) {
    next(error);
  }
}

export function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    Employee.findById(request.body["loginUser"]["id"]).exec(
      (error: Error | null, employee) => {
        if (error) throw new InternalServerError(error.message);
        if (!employee) throw new UnAuthorize("UnAuthorized");
        const role = employee.role;
        if (role === "Admin") {
          request.body["loginUser"]["role"] = role;
          next();
          return;
        }
        throw new UnAuthorize("UnAuthorized");
      }
    );
  } catch (error) {
    next(error);
  }
}

export function isLeader(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    Employee.findById(request.body["loginUser"]["id"]).exec(
      (error: Error | null, employee) => {
        if (error) {
          throw new InternalServerError(error.message);
        }
        if (!employee) {
          throw new UnAuthorize("UnAuthorized");
        }
        const role = employee.role;
        console.log(role);
        if (role === "Admin" || role === "Leader") {
          request.body["loginUser"]["role"] = role;
          next();
          return;
        }
        // case sai sẽ sai
        throw new UnAuthorize("UnAuthorized");
      }
    );
  } catch (error) {
    next(error);
  }
}
