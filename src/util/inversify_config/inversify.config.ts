import "reflect-metadata";
import * as express from "express";

import { Container } from "inversify";
import { TYPES } from "./types";
import { IEmployeeService } from "../../interfaces/employee/IEmployeeService.interface";
import { ITeamService } from "../../interfaces/team/ITeamService.interface";
import { EmployeeService } from "../../services/employee.service";
import { TeamService } from "../../services/team.service";
import { IUserService } from "../../interfaces/user/IUserService.interface";
import { UserService } from "../../services/user.service";
import { isAdmin, isLeader, isLogin } from "../../middlewares/authJWT";

const container = new Container();

container
  .bind<IEmployeeService>(TYPES.Employee)
  .to(EmployeeService)
  .inSingletonScope();

container.bind<ITeamService>(TYPES.Team).to(TeamService).inSingletonScope();
container.bind<IUserService>(TYPES.User).to(UserService).inSingletonScope();
container.bind<express.RequestHandler>("isAdmin").toConstantValue(isAdmin);
container.bind<express.RequestHandler>("isLogin").toConstantValue(isLogin);
container.bind<express.RequestHandler>("isLeader").toConstantValue(isLeader);
export default container;
