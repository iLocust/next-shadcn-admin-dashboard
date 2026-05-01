"use client";

import type { UserRole } from "@/types/hris";

// Hardcoded untuk development — akan diganti dengan data dari auth session BE
const CURRENT_ROLE: UserRole = "hr_admin";

export function useRole() {
  const role = CURRENT_ROLE;

  return {
    role,
    isHrAdmin: role === "hr_admin",
    isManager: role === "manager",
    isEmployee: role === "employee",
    isOwner: role === "owner",
    canEdit: role === "hr_admin" || role === "owner",
    canDelete: role === "hr_admin" || role === "owner",
    canApprove: role === "hr_admin" || role === "owner",
    canViewAll: role === "hr_admin" || role === "owner",
  };
}
