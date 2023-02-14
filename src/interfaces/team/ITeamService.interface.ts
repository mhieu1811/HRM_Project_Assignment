import { ITeam } from "./ITeam.interface";

export interface ITeamService {
  addTeam(team: ITeam): Promise<ITeam | null>;
  updateTeam(team: ITeam, teamId: string): Promise<ITeam | null>;
  getTeam(teamId: string): Promise<ITeam | null>;
  getTeamList(name: string): void;
  assignTeamLeader(empId: string, teamId: string): Promise<ITeam | null>;
  assignMember(empId: string, teamId: string): Promise<ITeam | null>;
  deleteMember(empId: string, teamId: string): Promise<ITeam | null>;
  getTeamByMember(empId: string): Promise<Array<ITeam> | null>;
  getTeamByLeader(empId: string): Promise<Array<ITeam> | null>;
}
