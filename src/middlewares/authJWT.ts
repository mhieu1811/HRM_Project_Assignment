import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model";
import InternalServerError from "../util/appErrors/errors/internalServer.error";
import UnAuthorize from "../util/appErrors/errors/unauthorize.error";

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
        throw err;
      }
      request.body["loginUser"] = decoded;
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
        if (error) next(new InternalServerError(error.message));
        if (!employee) {
          next(new UnAuthorize("UnAuthorized"));
          return;
        }
        const role = employee.role;
        if (role === "Admin") {
          request.body["loginUser"]["role"] = role;
          next();
          return;
        }
        next(new UnAuthorize("UnAuthorized"));
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
          next(new InternalServerError(error.message));
          return;
        }
        if (!employee) {
          next(new UnAuthorize("UnAuthorized"));
          return;
        }
        const role = employee.role;

        if (role === "Admin" || role === "Leader") {
          request.body["loginUser"]["role"] = role;
          next();
          return;
        }

        next(new UnAuthorize("UnAuthorized"));
      }
    );
  } catch (error) {
    next(error);
  }
}
