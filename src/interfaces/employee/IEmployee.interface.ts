import { Document } from "mongoose";
import { role } from "../../util/role.enum";
import { ITeam } from "../team/ITeam.interface";

export interface IEmployee extends Document {
  email: string;
  name: string;
  password: string;
  role: role;
  status: boolean;
  isDeleted: boolean;
}
