import { ITeam } from './ITeam.interface';

export interface IPersonal {
  employee: {
    name: string;
    email: string;
    role: string;
  };
  team: Array<ITeam>;
}
