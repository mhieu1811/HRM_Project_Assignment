import { Document, Schema, Types } from "mongoose";
import { IEmployee } from "../employee/IEmployee.interface";

export interface ITeam extends Document {
  teamName: string;
  leaderID: Types.ObjectId;
  members: Array<Types.ObjectId>;
  status: boolean;
  isDeleted: boolean;
}
