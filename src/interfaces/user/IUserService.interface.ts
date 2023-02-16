import { IUser } from "./IUser.interface";
import { loginReturnValue } from "./loginReturnValue.interface";

export interface IUserService {
  login(employee: IUser): Promise<loginReturnValue>;
}
