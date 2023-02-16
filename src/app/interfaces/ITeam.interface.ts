import { IEmployee } from './IEmployee.interface';

export interface ITeam {
  teamName: string;
  leaderID?: string;
  members?: Array<IEmployee>;
}
