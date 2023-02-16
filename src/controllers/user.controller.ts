import "reflect-metadata";
import { inject } from "inversify";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { Response, Request } from "express";
import { TYPES } from "../util/inversify_config/types";
import * as express from "express";
import { IUserService } from "../interfaces/user/IUserService.interface";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user/IUser.interface";
import container from "../util/inversify_config/inversify.config";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { IListTeam } from "../interfaces/team/IListTeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import { IReturnEmployee } from "../interfaces/employee/IReturnEmployee.interface";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { loginReturnValue } from "../interfaces/user/loginReturnValue.interface";
import logger from "../util/logger";
import { role } from "../util/role.enum";

@controller("/user")
export default class UserController {
  private _userService: IUserService;
  private _employeeService: IEmployeeService;
  private _teamService: ITeamService;

  constructor(
    @inject(TYPES.User) userService: UserService,
    @inject(TYPES.Employee) employeeService: IEmployeeService,
    @inject(TYPES.Team) teamService: ITeamService
  ) {
    this._userService = userService;
    this._employeeService = employeeService;
    this._teamService = teamService;
  }

  @httpPost("/login")
  async login(request: Request, response: Response) {
    try {
      const loginUser: IUser = request.body;
      const data: loginReturnValue = await this._userService.login(loginUser);

      return response
        .status(200)
        .json({
          token: data.token,
          email: data.email,
          name: data.name,
          role: data.role,
        });
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/personal", container.get<express.RequestHandler>("isLogin"))
  async getPersonalInformation(request: Request, response: Response) {
    try {
      const userId = request.body["loginUser"]["id"];
      const role = request.body["loginUser"]["role"];

      const personal: IReturnEmployee = await this._employeeService.getEmp(
        userId
      );

      let team: Array<IListTeam> | null = null;

      if (role === "Leader") {
        team = await this._teamService.getTeamByLeader(userId);
      } else if (role === "Member") {
        team = await this._teamService.getTeamByMember(userId);
      }

      return response.status(200).json({
        employee: {
          email: personal.email,
          name: personal.name,
          role: personal.role,
        },
        team: team,
      });
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/team/:id", container.get<express.RequestHandler>("isLogin"))
  async getTeamDetails(request: Request, response: Response) {
    try {
      const userId = request.body["loginUser"]["id"];

      const teamId: string = request.params["id"];

      if (!teamId) throw new NotFoundError("Params 'id' ");
      if (request.body["loginUser"]["role"] === "Member") {
        logger.debug(teamId);
        const isMemberInTeam: boolean = await this._teamService.isMemberInTeam(
          teamId,
          userId
        );

        if (!isMemberInTeam) throw new Error("This member not in this team");
      }

      const team: ITeam = await this._teamService.getTeam(teamId);

      return response.status(200).json({
        team,
      });
    } catch (error) {
      throw error;
    }
  }
}
