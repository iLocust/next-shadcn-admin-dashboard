import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  nip: z.string(),
  fullName: z.string(),
  photo: z.string().optional(),
  gender: z.enum(["Laki-laki", "Perempuan"]),
  branch: z.string(),
  region: z.string(),
  division: z.string(),
  jobPosition: z.string(),
  employmentType: z.enum(["Tetap", "Kontrak", "Probation"]),
  joinDate: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string().optional(),
  contractEndDate: z.string().optional(),
  probationEndDate: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Probation"]),
  role: z.enum(["hr_admin", "manager", "employee", "owner"]),
  onboardingProgress: z.number(),
});

export const employeesSchema = z.array(employeeSchema);

export type EmployeeRow = z.infer<typeof employeeSchema>;
