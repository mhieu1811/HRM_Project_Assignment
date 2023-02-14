import Employee from "../models/employee.model";
import generator from "generate-password";
import bcrypt from "bcryptjs";

export async function uniqeEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const count: number = await Employee.countDocuments({ email: email });
  if (count > 0) return false;
  return true;
}

export function generatePassword(): string {
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    symbols: true,
    strict: true,
  });
  const hashPassword = bcrypt.hashSync(password, 10);
  return hashPassword;
}
