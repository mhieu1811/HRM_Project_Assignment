import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
  TYPE,
} from "inversify-express-utils";
import { Response, Request } from "express";
import { TYPES } from "../util/inversify_config/types";
import * as express from "express";
import { IUserService } from "../interfaces/user/IUserService.interface";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user/IUser.interface";
import container from "../util/inversify_config/inversify.config";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { Types } from "mongoose";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";

// import logger from "../util/logger";

@controller("/user")
export default class UserController {
  private _userService: IUserService;
  private _employeeService: IEmployeeService;

  constructor(
    @inject(TYPES.User) userService: UserService,
    @inject(TYPES.Employee) employeeService: IEmployeeService
  ) {
    this._userService = userService;
    this._employeeService = employeeService;
  }

  @httpPost("/login")
  async login(request: Request, response: Response) {
    try {
      const loginUser: IUser = request.body;
      const token: string = await this._userService.login(loginUser);

      return response.status(200).json({ token: token });
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/personal", container.get<express.RequestHandler>("isLogin"))
  async getPersonalInformation(request: Request, response: Response) {
    try {
      const userId = request.body["loginUser"]["id"];

      const personal: IEmployee = await this._employeeService.getEmp(userId);

      return response.status(200).json({ data: personal });
    } catch (error) {
      throw error;
    }
  }
}
