import { injectable } from "inversify";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import Team from "../models/team.model";

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
    const currentTeam: ITeam | null = await Team.findById(teamId);

    if (!currentTeam) {
      throw new Error("Not found Employee!");
    }
    return currentTeam;
  }
  getTeamList(name: string): void {
    console.log("getTeamList");
  }
}
