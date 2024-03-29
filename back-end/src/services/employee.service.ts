import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import { IReturnEmployee } from "../interfaces/employee/IReturnEmployee.interface";
import Employee from "../models/employee.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import bcrypt from "bcryptjs";
import Team from "../models/team.model";
import { ITeam } from "../interfaces/team/ITeam.interface";

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
  ): Promise<IReturnEmployee | null> {
    await this.getEmp(employeeId);
    // if (employee.password) {
    //   const password = bcrypt.hashSync(employee.password, 10);
    //   employee.password = password;
    // }
    await Employee.findOneAndUpdate({ _id: employeeId }, employee);

    const updateEmp: IReturnEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false },
    ).select("-password -isDeleted");

    return updateEmp;
  }

  async deleteEmp(employeeId: string): Promise<IReturnEmployee | null> {
    await this.getEmp(employeeId);
    await Employee.findOneAndUpdate({ _id: employeeId }, { isDeleted: true });
    const teamAssigned: Array<ITeam> | null = await Team.find()
      .where("members")
      .in([employeeId])
      .select("_id");

    await Team.where("_id")
      .in([teamAssigned])
      .updateMany({ $pull: { members: employeeId } });

    const deleteEmp: IReturnEmployee | null = await await Employee.findOne(
      {
        _id: employeeId,
      },
      { isDeleted: false },
    ).select("-password -isDeleted");
    return deleteEmp;
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

  async getEmpList(role?: string): Promise<Array<IReturnEmployee> | null> {
    let condition = {};
    console.log(role);
    switch (role) {
      case "Member":
        condition = { isDeleted: false, role: "Member" };
        break;
      case "Leader":
        condition = { isDeleted: false, role: "Leader" };
        break;
      case "Admin":
        condition = { isDeleted: false };
        break;
      default:
        condition = { isDeleted: false, role: { $ne: "Admin" } };
        break;
    }
    const listEmp: Array<IReturnEmployee> | null = await Employee.find(
      condition,
    ).select("-password -isDeleted ");
    return listEmp;
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
    if (currentEmp.role === "Member") return true;

    return false;
  }
}
