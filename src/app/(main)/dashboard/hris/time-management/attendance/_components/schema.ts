import { z } from "zod";

export const attendanceRowSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  date: z.string(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(["On-time", "Late", "Early Leave", "Absent"]),
  shift: z.string(),
  location: z.string().optional(),
  notes: z.string().optional(),
  duration: z.number().optional(),
});

export type AttendanceRow = z.infer<typeof attendanceRowSchema>;
