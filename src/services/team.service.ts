import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import Employee from "../models/employee.model";
import Team from "../models/team.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
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

  async getTeam(teamId: string): Promise<ITeam> {
    const currentTeam: ITeam | null = await Team.findById(teamId)
      .populate({ path: "leaderID", select: "-password -_id -role -isDeleted" })
      .populate({ path: "members", select: "-password -_id -role -isDeleted" });

    if (!currentTeam) {
      throw new Error("Not found Employee!");
    }
    return currentTeam;
  }

  async getTeamList(): Promise<Array<ITeam> | null> {
    const listTeam: Array<ITeam> | null = await Team.find({
      isDeleted: false,
    }).select("-members -leaderID");
    return listTeam;
  }

  async assignMember(empId: string, teamId: string): Promise<ITeam | null> {
    const currentTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false }
    );
    if (!currentTeam) throw new NotFoundError("Team");

    const checkExistMember = await Team.findOne({
      _id: teamId,
    })
      .where("members")
      .in([empId]);

    if (checkExistMember) throw new Error("This member already exist");

    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false }
    );
    if (!currentEmp) throw new NotFoundError("Employee");

    await await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { members: empId } }
    );

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false }
    );
    return updateTeam;
  }

  async assignTeamLeader(empId: string, teamId: string): Promise<ITeam | null> {
    const currentEmp: IEmployee | null = await Employee.findOne(
      {
        _id: empId,
      },
      { isDeleted: false }
    );
    if (!currentEmp) throw new NotFoundError("Employee do not exist");
    if (currentEmp.role !== "Leader") throw new Error("Employee not a leader");

    const currentTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false }
    );

    if (!currentTeam) throw new NotFoundError("Team do not exist");

    await await Team.findOneAndUpdate({ _id: teamId }, { leaderID: empId });

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false }
    );

    return updateTeam;
  }

  async deleteMember(empId: string, teamId: string): Promise<ITeam | null> {
    const checkExistMember = await Team.findOne({
      _id: teamId,
    })
      .where("members")
      .in([empId]);

    if (!checkExistMember)
      throw new Error(
        "This member do not in this team or Team's Id do not exist"
      );

    await await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { members: empId } }
    );

    const updateTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false }
    );

    return updateTeam;
  }

  async getTeamByMember(empId: string): Promise<Array<ITeam> | null> {
    const listTeam: Array<ITeam> | null = await Team.find({
      isDeleted: false,
    })
      .where("members")
      .in([empId])
      .select("-members -leaderID");
    if (!listTeam) return null;
    return listTeam;
  }

  async getTeamByLeader(empId: string): Promise<Array<ITeam> | null> {
    const listMember: Array<ITeam> | null = await Team.find({
      leaderID: new Types.ObjectId(empId),
      isDeleted: false,
    }).select("-members -leaderID");
    if (!listMember) return null;
    return listMember;
  }

  async isMemberInTeam(teamId: string, userId: string): Promise<boolean> {
    const checkExistMember = await Team.findOne({
      _id: teamId,
    })
      .where("members")
      .in([userId]);

    if (!checkExistMember) return false;
    return true;
  }
}
