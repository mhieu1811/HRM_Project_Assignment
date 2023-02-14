import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import Employee from "../models/employee.model";
import { ISearch, IPaginate } from "../util/query.interface";

@injectable()
export class EmployeeService implements IEmployeeService {
  async addEmp(employee: IEmployee): Promise<IEmployee> {
    const newEmployee = new Employee(employee);
    await newEmployee.save();
    return newEmployee;
  }

  async updateEmp(
    employee: IEmployee,
    employeeId: string
  ): Promise<IEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate({ _id: employeeId }, employee).exec();
    const updateEmp: IEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false }
    );
    return updateEmp;
  }

  async deleteEmp(employeeId: string): Promise<IEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate(
      { _id: employeeId },
      { isDeleted: true }
    ).exec();
    const updateEmp: IEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false }
    );
    return updateEmp;
  }

  async getEmp(employeeId: string): Promise<IEmployee> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false }
    );

    if (!currentEmp) {
      throw new Error("Not found Employee!");
    }

    return currentEmp;
  }
  getEmpList(optionsMatch: ISearch, paginateParams: IPaginate): void {
    console.log("A");
  }
}
