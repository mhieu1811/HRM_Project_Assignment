import { IEmployee } from "./IEmployee.interface";
import { IReturnEmployee } from "./IReturnEmployee.interface";
export interface IEmployeeService {
  addEmp(employee: IEmployee): Promise<IEmployee>;
  updateEmp(
    employee: IEmployee,
    employeeId: string
  ): Promise<IReturnEmployee | null>;
  getEmp(employeeId: string): Promise<IReturnEmployee>;
  deleteEmp(employeeId: string): Promise<IReturnEmployee | null>;
  getEmpList(): Promise<Array<IReturnEmployee> | null>;
  empIsLeader(empId: string): Promise<boolean>;
  empIsMember(empId: string): Promise<boolean>;
}
