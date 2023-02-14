import { Document, Schema, Types } from "mongoose";

export interface IListTeam extends Document {
  teamName: string;
  leaderID: Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}
