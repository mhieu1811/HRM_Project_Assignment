import { IEmployee } from './IEmployee.interface';

export interface ITeam {
  teamName: string;
  leaderID: IEmployee;
  members?: Array<IEmployee>;
}
