import { injectable } from "inversify";
import { IUser } from "../interfaces/user/IUser.interface";
import { IUserService } from "../interfaces/user/IUserService.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model";

@injectable()
export class UserService implements IUserService {
  async login(user: IUser): Promise<string> {
    const userLogin = await Employee.findOne({ email: user.email });

    if (!userLogin) throw new Error("Wrong email or password");

    const passwordIsvalid = bcrypt.compareSync(
      user.password,
      userLogin.password
    );

    if (!passwordIsvalid) throw new Error("Wrong email or password");

    const token = jwt.sign(
      { email: userLogin.email, role: userLogin.role, id: userLogin._id },
      "hieulaiminh",
      {
        expiresIn: 1600, // 1 hours
      }
    );

    return token;
  }

  refreshToken(): string {
    return "A";
  }
}
