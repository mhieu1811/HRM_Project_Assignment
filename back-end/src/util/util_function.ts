import Employee from "../models/employee.model";
// import generator from "generate-password";
import bcrypt from "bcryptjs";

export async function uniqeEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const count: number = await Employee.countDocuments({ email: email });
  if (count > 0) return false;
  return true;
}

export function generatePassword(): string {
  const password = "HYa24@1haj";
  const hashPassword = bcrypt.hashSync(password, 10);
  return hashPassword;
}
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
