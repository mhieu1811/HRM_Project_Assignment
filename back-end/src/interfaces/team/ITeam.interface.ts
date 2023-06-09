import { Document, Types } from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  leaderID: Types.ObjectId;
  members: Array<Types.ObjectId>;
  status: boolean;
  isDeleted: boolean;
}
