import { Document } from "mongoose";
import { role } from "../../util/role.enum";

export interface IReturnEmployee extends Document {
  email: string;
  name: string;
  role: role;
  status: boolean;
}
