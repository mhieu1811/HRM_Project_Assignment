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
import { generate } from "generate-password";
import { generatePassword, uniqeEmail } from "../util/util_function";

// import logger from "../util/logger";

@controller("/employees")
export default class EmployeeController {
  private _employeeService: IEmployeeService;

  constructor(@inject(TYPES.Employee) employeeService: IEmployeeService) {
    this._employeeService = employeeService;
  }

  @httpPost("/")
  async addEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body;
      //check uniqe email
      const isEmailValid = await uniqeEmail(emp.email);
      if (!isEmailValid) throw new Error("email not valid");
      //generate and hash password
      emp.password = generatePassword();

      const employee = await this._employeeService.addEmp(emp);

      response.status(200).send(employee);
    } catch (err) {
      throw new Error("error");
    }
  }

  @httpGet("/:id")
  async getEmployee(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const employee = await this._employeeService.getEmp(id);

      if (employee === null) return response.status(404);

      response.status(200).json(employee);
    } catch (error) {
      throw new Error("error");
    }
  }

  @httpPut("/:id")
  async updateEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body.employee;
      const empId: string = request.params.id;

      await this._employeeService.updateEmp(emp, empId);

      response.status(204);
    } catch (error) {
      console.log(error);
      throw new Error("error");
    }
  }
  @httpDelete("/:id")
  async deleteEmp(request: Request, response: Response) {
    try {
      const empId: string = request.params.id;

      await this._employeeService.deleteEmp(empId);

      response.status(204);
    } catch (error) {
      console.log(error);
      throw new Error("error");
    }
  }
}
