import { role } from "../../util/role.enum";

export interface IJwtFormat {
  email: string;
  role: role;
  id: string;
}
