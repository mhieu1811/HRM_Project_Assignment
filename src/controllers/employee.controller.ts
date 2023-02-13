import "reflect-metadata";
import { inject } from "inversify";
import generator from "generate-password";
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
// import logger from "../util/logger";

@controller("/employees")
export default class EmployeeController {
  private _employeeService: IEmployeeService;

  constructor(@inject(TYPES.Employee) employeeService: IEmployeeService) {
    this._employeeService = employeeService;
  }

  @httpPost("/add")
  async addEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body;
      emp.password = generator.generate({
        length: 10,
        numbers: true,
      });
      console.log(request.body);
      const employee = await this._employeeService.addEmp(emp);
      response.status(200).send(employee);
    } catch (err) {}
  }

  @httpGet("/:id")
  async getEmployee(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const employee = await this._employeeService.getEmp(id);

      if (employee === null) return response.status(404);

      return response.status(200).json(employee);
    } catch (error) {
      console.log(error);
    }
  }

  @httpPut("/update")
  async updateEmployee(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body.employee;
      const empId: string = request.body.id;
      const updateEmp = await this._employeeService.updateEmp(emp, empId);
      return response.status(204).json(updateEmp);
    } catch (error) {
      console.log(error);
    }
  }
  @httpDelete("/delete/:id")
  async deleteEmp(request: Request, response: Response) {
    try {
      const emp: IEmployee = request.body.employee;
      emp.isDeleted = true;
      const empId: string = request.body.id;
      const updateEmp = await this._employeeService.updateEmp(emp, empId);
      return response.status(204).json(updateEmp);
    } catch (error) {
      console.log(error);
    }
  }
}
