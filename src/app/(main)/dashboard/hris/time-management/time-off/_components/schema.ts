import { z } from "zod";

export const leaveRequestSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  leaveType: z.enum(["Cuti Tahunan", "Cuti Sakit", "Cuti Melahirkan", "Cuti Penting"]),
  startDate: z.string(),
  endDate: z.string(),
  totalDays: z.number(),
  reason: z.string(),
  status: z.enum(["Pending", "Approved", "Rejected", "Cancelled"]),
  rejectionReason: z.string().optional(),
  createdAt: z.string(),
});

export type LeaveRequestRow = z.infer<typeof leaveRequestSchema>;
