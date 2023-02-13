import { role } from "./role.enum";

export interface ISearch {
  name?: string;
  role?: role;
}

export interface ISort {
  name?: string;
}

export interface IPaginate {
  page?: number;
  skip?: number;
  limit?: number;
}
