import { Document } from "mongoose";
import { IEmployee } from "../employee/IEmployee.interface";

export interface ITeam extends Document {
  teamName: string;
  leaderID: IEmployee;
  status: boolean;
  isDeleted: boolean;
}
