import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import Employee from "../models/employee.model";
import Team from "../models/team.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import { role } from "../util/role.enum";
import { Types } from "mongoose";

@injectable()
export class TeamService implements ITeamService {
  async addTeam(team: ITeam): Promise<ITeam | null> {
    const newTeam = new Team(team);
    await newTeam.save();
    return newTeam;
  }
  async updateTeam(team: ITeam, teamId: string): Promise<ITeam | null> {
    await this.getTeam(teamId);
    await Team.updateOne({ _id: teamId }, team);
    const updateEmp: ITeam | null = await Team.findById(teamId);
    return updateEmp;
  }
  async getTeam(teamId: string): Promise<ITeam | null> {
    const currentTeam: ITeam | null = await Team.findById(teamId)
      .populate("leaderID")
      .populate("members");

    if (!currentTeam) {
      throw new Error("Not found Employee!");
    }
    return currentTeam;
  }
  getTeamList(name: string): void {
    console.log("getTeamList");
  }
  async assignMember(empId: string, teamId: string): Promise<ITeam | null> {
    const currentTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
    );
    if (!currentTeam) throw new NotFoundError("Team do not exist");

    const checkExistMember = await Team.exists({
      _id: teamId,
      members: { $elemMatch: { _id: new Types.ObjectId(empId) } },
    });
    if (!checkExistMember) throw new Error("This member already exist");

    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false },
    );
    if (!currentEmp) throw new NotFoundError("Employee do not exist");

    await await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { members: empId } },
    );

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
    );
    return updateTeam;
  }

  async assignTeamLeader(empId: string, teamId: string): Promise<ITeam | null> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false },
    );
    console.log(empId);
    if (!currentEmp) throw new NotFoundError("Employee do not exist");
    if (currentEmp.role !== "Leader") throw new Error("Employee not a leader");

    const currentTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
    );

    if (!currentTeam) throw new NotFoundError("Team do not exist");

    await await Team.findOneAndUpdate({ _id: teamId }, { leaderID: empId });

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
    );

    return updateTeam;
  }

  async deleteMember(empId: string, teamId: string): Promise<ITeam | null> {
    const checkExistMember = await Team.exists({
      _id: teamId,
      members: { $elemMatch: { _id: new Types.ObjectId(empId) } },
    });
    if (checkExistMember)
      throw new Error(
        "This member do not in this team or Team's Id do not exist",
      );

    await await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { members: empId } },
    );

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
    );

    return updateTeam;
  }
}
