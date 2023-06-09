import { IEmployee } from './IEmployee.interface';

export interface ITeam {
  teamName: string;
  leaderID: string;
  members?: Array<IEmployee>;
}

export interface IGetTeam {
  _id?: string;
  teamName: string;
  leaderID: IEmployee;
  members?: Array<IEmployee>;
}
