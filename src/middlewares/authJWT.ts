import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import Employee from "../models/employee.model";

export function isLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const tokenString = request.header("Authorization");
    if (!tokenString)
      return response.status(403).send({ message: "No token provided!" });
    const token = tokenString.replace("Bearer ", "");
    if (!token) {
      return response.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, "hieulaiminh", (err, decoded) => {
      if (err || !decoded) {
        return response.status(401).send({ message: err });
      }
      request.body["loginUser"] = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
}

export async function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const employee: IEmployee | null = await Employee.findById(
      request.body["loginUser"]["id"]
    );
    if (!employee) return response.status(403).send({ message: "UnAuthorize" });

    const role = employee.role;

    if (role === "Admin") next();

    throw new Error("UnAuthorized");
  } catch (error) {
    next(error);
  }
}

export async function isLeader(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const employee: IEmployee | null = await Employee.findById(
      request.body["loginUser"]
    );
    if (!employee)
      return response.status(403).send({ message: "No token provided!" });

    const role = employee.role;

    if (role === "Leader") next();
    else return response.status(403).send({ message: "No token provided!" });
  } catch (err) {
    throw err;
  }
}
