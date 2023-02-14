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
import { IListTeam } from "../interfaces/team/IListTeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";

// import logger from "../util/logger";

@controller("/user")
export default class UserController {
  private _userService: IUserService;
  private _employeeService: IEmployeeService;
  private _teamService: ITeamService;

  constructor(
    @inject(TYPES.User) userService: UserService,
    @inject(TYPES.Employee) employeeService: IEmployeeService,
    @inject(TYPES.Team) teamService: ITeamService,
  ) {
    this._userService = userService;
    this._employeeService = employeeService;
    this._teamService = teamService;
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
      const role = request.body["loginUser"]["role"];

      const personal: IEmployee = await this._employeeService.getEmp(userId);
      let team: Array<IListTeam> | null = null;

      if (role === "Leader") {
        team = await this._teamService.getTeamByLeader(userId);
      } else if (role === "Member") {
        team = await this._teamService.getTeamByMember(userId);
      }

      return response.status(200).json({
        data: {
          email: personal.email,
          name: personal.name,
          role: personal.role,
          team: team,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
