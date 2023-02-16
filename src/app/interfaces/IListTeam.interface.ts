import { IEmployee } from './IEmployee.interface';

export interface IListTeam {
  _id: string;
  teamName: string;
  leaderID?: IEmployee;
  members?: Array<IEmployee>;
}
