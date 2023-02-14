import { injectable } from "inversify";
import { IUser } from "../interfaces/user/IUser.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model";
import { IUserService } from "../interfaces/user/IUserService.interface";
import UnAuthorize from "../util/appErrors/errors/unauthorize.error";
import { IJwtFormat } from "../interfaces/user/JWT.interface";

@injectable()
export class UserService implements IUserService {
  async login(user: IUser): Promise<string> {
    const userLogin = await Employee.findOne({ email: user.email });

    if (!userLogin) throw new UnAuthorize("Wrong email or password");

    const passwordIsvalid = bcrypt.compareSync(
      user.password,
      userLogin.password,
    );

    if (!passwordIsvalid) throw new UnAuthorize("Wrong email or password");
    const data: IJwtFormat = {
      email: userLogin.email,
      role: userLogin.role,
      id: userLogin._id,
    };
    const token = jwt.sign(data, "hieulaiminh", {
      expiresIn: 1600, // 1 hours
    });

    return token;
  }
}
