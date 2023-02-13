import { model, Schema } from "mongoose";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { role } from "../util/role.enum";

const EmployeeSchema: Schema = new Schema<IEmployee>(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character  ",
      ],
    },
    role: {
      type: String,
      enum: role,
      default: role.member,
    },
    dob: {
      type: String,
      required: true,
    },

    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    phoneNumber: {
      type: String,
      required: true,
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

const Employee = model<IEmployee>("Employee", EmployeeSchema);
export default Employee;
