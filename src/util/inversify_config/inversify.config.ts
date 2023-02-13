import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IEmployeeService } from "../../interfaces/employee/IEmployeeService.interface";
import { ITeamService } from "../../interfaces/team/ITeamService.interface";
import { EmployeeService } from "../../services/employee.service";
import { TeamService } from "../../services/team.service";

const container = new Container();

container
  .bind<IEmployeeService>(TYPES.Employee)
  .to(EmployeeService)
  .inSingletonScope();

container.bind<ITeamService>(TYPES.Team).to(TeamService).inSingletonScope();

export default container;
