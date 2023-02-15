import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { IReturnEmployee } from "../interfaces/employee/IReturnEmployee.interface";
import Employee from "../models/employee.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import bcrypt from "bcryptjs";

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
  ): Promise<IReturnEmployee | null> {
    await this.getEmp(employeeId);
    if (employee.password) {
      const password = bcrypt.hashSync(employee.password, 10);
      employee.password = password;
    }
    await Employee.findOneAndUpdate({ _id: employeeId }, employee);
    const updateEmp: IReturnEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false }
    ).select("-password -isDeleted");
    return updateEmp;
  }

  async deleteEmp(employeeId: string): Promise<IReturnEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate(
      { _id: employeeId },
      { isDeleted: true }
    ).exec();
    const updateEmp: IReturnEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false }
    ).select("-password -isDeleted");
    return updateEmp;
  }

  async getEmp(employeeId: string): Promise<IReturnEmployee> {
    const currentEmp: IReturnEmployee | null = await Employee.findOne({
      _id: employeeId,
      isDeleted: false,
    }).select("-password -isDeleted");

    if (!currentEmp) {
      throw new NotFoundError("Not found Employee!");
    }

    return currentEmp;
  }

  async getEmpList(): Promise<Array<IReturnEmployee> | null> {
    const listEmp: Array<IReturnEmployee> | null = await Employee.find({
      isDeleted: false,
    }).select("-password -isDeleted");
    return listEmp;
  }

  async empIsLeader(empId: string): Promise<boolean> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false }
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
      { isDeleted: false }
    );

    if (!currentEmp) throw new NotFoundError("Employee do not exist");
    if (currentEmp.role === "Member") return true;

    return false;
  }
}
