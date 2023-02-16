import "reflect-metadata";
import * as express from "express";
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
import logger from "../util/logger";
import container from "../util/inversify_config/inversify.config";
import UnAuthorize from "../util/appErrors/errors/unauthorize.error";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import { IListTeam } from "../interfaces/team/IListTeam.interface";
import { IReturnEmployee } from "../interfaces/employee/IReturnEmployee.interface";

@controller("/employees")
export default class EmployeeController {
  private _employeeService: IEmployeeService;
  private _teamService: ITeamService;

  constructor(
    @inject(TYPES.Employee) employeeService: IEmployeeService,
    @inject(TYPES.Team) teamService: ITeamService
  ) {
    this._employeeService = employeeService;
    this._teamService = teamService;
  }

  @httpPost(
    "/",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader")
  )
  async addEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body;

      // check role new User
      if (
        (emp.role === "Admin" || emp.role === "Leader") &&
        request.body["loginUser"]["role"] !== "Admin"
      )
        throw new UnAuthorize("do not have permission");

      //check uniqe email
      const isEmailValid = await uniqeEmail(emp.email);

      if (!isEmailValid) throw new Error("email not valid");

      //generate and hash password
      emp.password = generatePassword();

      const employee = await this._employeeService.addEmp(emp);

      return response.status(200).send(employee);
    } catch (error) {
      throw error;
    }
  }

  @httpGet(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader")
  )
  async getEmployee(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const employee: IReturnEmployee = await this._employeeService.getEmp(id);

      if (!employee) throw new NotFoundError("Employee not found");

      let team: Array<IListTeam> | null = null;
      const role = employee.role;
      if (role === "Leader") {
        team = await this._teamService.getTeamByLeader(id);
      } else if (role === "Member") {
        team = await this._teamService.getTeamByMember(id);
      }

      return response.status(200).json({ employee: employee, team: team });
    } catch (error) {
      throw error;
    }
  }

  @httpPut(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader")
  )
  async updateEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body.employee;
      const empId: string = request.params.id;

      await this._employeeService.updateEmp(emp, empId);

      return response.status(201).json({ message: "update success" });
    } catch (error) {
      throw error;
    }
  }

  @httpDelete(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader")
  )
  async deleteEmp(request: Request, response: Response) {
    try {
      const empId: string = request.params.id;

      await this._employeeService.deleteEmp(empId);

      return response.status(201).json({ message: "delete success" });
    } catch (error) {
      throw error;
    }
  }

  @httpGet(
    "/",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader")
  )
  async getListEmployee(request: Request, response: Response) {
    try {
      const role: string = request.query["role"]
        ? request.query["role"].toString()
        : "All";
      console.log(role);
      if (role == "Admin" && request.body["loginUser"]["role"] !== "Admin")
        throw new UnAuthorize("do not have permission");

      const employeeList: Array<IReturnEmployee> | null =
        await this._employeeService.getEmpList(role);
      return response.status(200).json(employeeList);
    } catch (error) {
      throw error;
    }
  }
}
