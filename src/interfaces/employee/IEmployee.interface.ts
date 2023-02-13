import { Document } from "mongoose";
import { role } from "../../util/role.enum";
import { ITeam } from "../team/ITeam.interface";

export interface IEmployee extends Document {
  email: string;
  name: string;
  username: string;
  password: string;
  dob: string;
  phoneNumber: string;
  team: Array<ITeam>;
  role: role;
  status: boolean;
  isDeleted: boolean;
}
