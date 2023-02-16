import { Document, Types } from "mongoose";

export interface IReturnTeam extends Document {
  teamName: string;
  leaderID: Types.ObjectId;
  members: Array<Types.ObjectId>;
}
