import { model, Schema } from "mongoose";
import { ITeam } from "../interfaces/team/ITeam.interface";

const TeamSchema: Schema = new Schema<ITeam>(
  {
    teamName: { type: String, required: true },
    leaderID: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Team = model("Team", TeamSchema);

export default Team;
