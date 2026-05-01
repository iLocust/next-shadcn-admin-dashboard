import { z } from "zod";

export const scheduleRowSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  shiftType: z.enum(["Morning", "Evening", "Night"]),
  location: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
});

export type ScheduleRow = z.infer<typeof scheduleRowSchema>;
