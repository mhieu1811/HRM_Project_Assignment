import { IEmployee } from "./IEmployee.interface";
import { ISearch, IPaginate } from "../../util/query.interface";
export interface IEmployeeService {
  addEmp(employee: IEmployee): Promise<IEmployee>;
  updateEmp(employee: IEmployee, employeeId: string): Promise<IEmployee | null>;
  getEmp(employeeId: string): Promise<IEmployee>;
  getEmpList(optionsMatch: ISearch, paginateParams: IPaginate): void;
}
