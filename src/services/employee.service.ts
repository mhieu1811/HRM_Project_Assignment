import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";
import Employee from "../models/employee.model";
import Team from "../models/team.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import { ISearch, IPaginate } from "../util/query.interface";
import { role } from "../util/role.enum";

@injectable()
export class EmployeeService implements IEmployeeService {
  async addEmp(employee: IEmployee): Promise<IEmployee> {
    const newEmployee = new Employee(employee);
    await newEmployee.save();
    return newEmployee;
  }

  async updateEmp(
    employee: IEmployee,
    employeeId: string,
  ): Promise<IEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate({ _id: employeeId }, employee);
    const updateEmp: IEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false },
    );
    return updateEmp;
  }

  async deleteEmp(employeeId: string): Promise<IEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate(
      { _id: employeeId },
      { isDeleted: true },
    ).exec();
    const updateEmp: IEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false },
    );
    return updateEmp;
  }

  async getEmp(employeeId: string): Promise<IEmployee> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false },
    );

    if (!currentEmp) {
      throw new NotFoundError("Not found Employee!");
    }

    return currentEmp;
  }
  getEmpList(optionsMatch: ISearch, paginateParams: IPaginate): void {
    console.log("A");
  }

  async empIsLeader(empId: string): Promise<boolean> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false },
    );

    if (!currentEmp) throw new NotFoundError("Employee do not exist");
    if (currentEmp.role === "Leader") return true;

    return false;
  }
  async empIsMember(empId: string): Promise<boolean> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false },
    );

    if (!currentEmp) throw new NotFoundError("Employee do not exist");
    console.log(currentEmp);
    if (currentEmp.role === "Member") return true;

    return false;
  }
}
