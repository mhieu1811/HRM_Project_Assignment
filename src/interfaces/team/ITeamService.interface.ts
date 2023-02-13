import { ITeam } from "./ITeam.interface";

export interface ITeamService {
  addTeam(team: ITeam): void;
  updateTeam(team: ITeam, teamId: string): void;
  getTeam(teamId: string): void;
  getTeamList(name: string): void;
}
