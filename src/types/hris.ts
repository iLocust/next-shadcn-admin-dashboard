export type EmploymentType = "Tetap" | "Kontrak" | "Probation";
export type EmployeeStatus = "Active" | "Inactive" | "Probation";
export type UserRole = "hr_admin" | "manager" | "employee" | "owner";
export type Gender = "Laki-laki" | "Perempuan";
export type CareerMovementType = "Promosi" | "Mutasi" | "Demosi";
export type AttendanceStatus = "On-time" | "Late" | "Early Leave" | "Absent";
export type LeaveType = "Cuti Tahunan" | "Cuti Sakit" | "Cuti Melahirkan" | "Cuti Penting";
export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";
export type OvertimeStatus = "Pending HR" | "Approved" | "Rejected";
export type ShiftType = "Morning" | "Evening" | "Night";

export interface Employee {
  id: string;
  nip: string;
  fullName: string;
  photo?: string;
  gender: Gender;
  branch: string;
  region: string;
  division: string;
  jobPosition: string;
  employmentType: EmploymentType;
  joinDate: string;
  email: string;
  phone: string;
  address?: string;
  contractEndDate?: string;
  probationEndDate?: string;
  status: EmployeeStatus;
  role: UserRole;
  onboardingProgress: number;
}

export interface CareerMovement {
  id: string;
  employeeId: string;
  type: CareerMovementType;
  fromPosition: string;
  toPosition: string;
  fromDivision: string;
  toDivision: string;
  fromBranch: string;
  toBranch: string;
  effectiveDate: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  shift: string;
  location?: string;
  notes?: string;
  duration?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  attachment?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface OvertimeRequest {
  id: string;
  employeeId: string;
  managerId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  reason: string;
  status: OvertimeStatus;
  overtimeRate?: number;
  compensation?: number;
  approvalNotes?: string;
  createdAt: string;
}

export interface Schedule {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: ShiftType;
  location?: string;
  notes?: string;
  status: "Active" | "Inactive";
}
