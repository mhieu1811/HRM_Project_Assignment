import { IUser } from "./IUser.interface";

export interface IUserService {
  login(employee: IUser): Promise<string>;
}
