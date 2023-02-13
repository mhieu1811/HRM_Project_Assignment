import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import Employee from "../models/employee.model";
import { ISearch, ISort, IPaginate } from "../util/query.interface";

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
    await Employee.updateOne({ _id: employeeId }, employee);
    const updateEmp: IEmployee | null = await Employee.findById(employeeId);
    return updateEmp;
  }
  async getEmp(employeeId: string): Promise<IEmployee> {
    const currentEmp: IEmployee | null = await Employee.findById(employeeId);

    if (!currentEmp) {
      throw new Error("Not found Employee!");
    }

    return currentEmp;
  }
  getEmpList(optionsMatch: ISearch, paginateParams: IPaginate): void {
    console.log("A");
  }
}
