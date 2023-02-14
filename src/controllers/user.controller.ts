import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { Response, Request } from "express";
import { TYPES } from "../util/inversify_config/types";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { generatePassword, uniqeEmail } from "../util/util_function";
import { IUserService } from "../interfaces/user/IUserService.interface";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user/IUser.interface";

// import logger from "../util/logger";

@controller("/user")
export default class UserController {
  private _userService: IUserService;

  constructor(@inject(TYPES.User) userService: UserService) {
    this._userService = userService;
  }

  @httpPost("/login")
  async addEmployee(request: Request, response: Response) {
    try {
      const loginUser: IUser = request.body;
      const token: string = await this._userService.login(loginUser);
      response.status(200).json({ token: token });
    } catch (err) {
      throw new Error("error");
    }
  }
}
