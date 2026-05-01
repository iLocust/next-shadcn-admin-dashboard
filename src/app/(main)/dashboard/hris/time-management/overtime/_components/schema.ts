import { z } from "zod";

export const overtimeRowSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number(),
  reason: z.string(),
  status: z.enum(["Pending HR", "Approved", "Rejected"]),
  compensation: z.number().optional(),
  approvalNotes: z.string().optional(),
  createdAt: z.string(),
});

export type OvertimeRow = z.infer<typeof overtimeRowSchema>;
