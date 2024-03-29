import { injectable } from "inversify";
import { IEmployee } from "../interfaces/employee/IEmployee.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import Employee from "../models/employee.model";
import Team from "../models/team.model";
import NotFoundError from "../util/appErrors/errors/notFound.error";
import { Types } from "mongoose";
import { IReturnEmployee } from "../interfaces/employee/IReturnEmployee.interface";
import { IReturnTeam } from "../interfaces/team/IReturnTeam.interface";
import logger from "../util/logger";

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
    if (team.leaderID)
      await this.assignTeamLeader(team.leaderID.toString(), teamId);
    const updateEmp: ITeam | null = await Team.findById(teamId);
    return updateEmp;
  }

  async deleteTeam(teamId: string): Promise<ITeam | null> {
    await this.getTeam(teamId);
    await Team.updateOne({ _id: teamId }, { isDeleted: true });
    const deleteEmp: ITeam | null = await Team.findById(teamId);
    return deleteEmp;
  }

  async getTeam(teamId: string): Promise<ITeam> {
    const currentTeam: ITeam | null = await Team.findOne({
      _id: teamId,
      isDeleted: false,
    })
      .populate({
        path: "leaderID",
        select: "-password  -role -isDeleted -team",
      })
      .populate({
        path: "members",
        select: "-password  -isDeleted -team",
      });

    if (!currentTeam) {
      throw new NotFoundError("Team!");
    }
    return currentTeam;
  }

  async getTeamList(): Promise<Array<ITeam> | null> {
    const listTeam: Array<ITeam> | null = await Team.find({
      isDeleted: false,
    })
      .select("-members ")
      .populate({
        path: "leaderID",
        select: "-password -_id -role -isDeleted -team",
      });
    return listTeam;
  }

  async assignMember(empId: string, teamId: string): Promise<ITeam | null> {
    const currentTeam: ITeam | null = await Team.findOne(
      {
        _id: teamId,
      },
      { isDeleted: false },
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
      { isDeleted: false },
    );
    if (!currentEmp) throw new NotFoundError("Employee");

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
    const checkExistMember = await Team.findOne({
      _id: teamId,
    })
      .where("members")
      .in([empId]);

    if (!checkExistMember)
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

  async getTeamByMember(empId: string): Promise<Array<ITeam> | null> {
    const listTeam: Array<ITeam> | null = await Team.find({
      isDeleted: false,
    })
      .where("members")
      .in([empId])
      .select("-members  -status -isDeleted")
      .populate({
        path: "leaderID",
        select: "-password -_id -role -isDeleted -team",
      });
    if (!listTeam) return null;
    return listTeam;
  }

  async getTeamByLeader(empId: string): Promise<Array<ITeam> | null> {
    const listMember: Array<ITeam> | null = await Team.find({
      leaderID: new Types.ObjectId(empId),
      isDeleted: false,
    })
      .select("-members  -status -isDeleted")
      .populate({
        path: "leaderID",
        select: "-password -_id -role -isDeleted -team",
      });
    if (!listMember) return null;
    return listMember;
  }

  async isMemberInTeam(teamId: string, userId: string): Promise<boolean> {
    const checkExistMember = await Team.findOne({
      _id: teamId,
    })
      .where("members")
      .in([userId]);
    logger.debug(checkExistMember);
    if (!checkExistMember) return false;

    return true;
  }
}
