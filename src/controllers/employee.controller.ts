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
import {
  generatePassword,
  getErrorMessage,
  uniqeEmail,
} from "../util/util_function";
import logger from "../util/logger";
import container from "../util/inversify_config/inversify.config";
import UnAuthorize from "../util/appErrors/errors/unauthorize.error";

// import logger from "../util/logger";

@controller("/employees")
export default class EmployeeController {
  private _employeeService: IEmployeeService;

  constructor(@inject(TYPES.Employee) employeeService: IEmployeeService) {
    this._employeeService = employeeService;
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
      logger.info("role" + request.body["loginUser"]["role"]);

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
      const employee = await this._employeeService.getEmp(id);

      if (employee === null) return response.status(404);

      response.status(200).json(employee);
    } catch (error) {
      // const message: string = getErrorMessage(error);
      // logger.error(message);
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

      response.status(204);
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

      response.status(204);
    } catch (error) {
      throw error;
    }
  }
}
