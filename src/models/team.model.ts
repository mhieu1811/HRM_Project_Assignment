import { model, Schema } from "mongoose";
import { ITeam } from "../interfaces/team/ITeam.interface";
import Employee from "./employee.model";

const TeamSchema: Schema = new Schema<ITeam>(
  {
    teamName: { type: String, required: true },
    leaderID: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

const Team = model<ITeam>("Team", TeamSchema);
TeamSchema.path("leaderID").validate(async (value) => {
  return await Employee.findById(value);
}, "Employee does not exist");

TeamSchema.path("members").validate(async (value) => {
  if (value.length === 0) return true;
  return await Employee.findById(value[value.length - 1]);
}, "Member does not exist");
export default Team;
