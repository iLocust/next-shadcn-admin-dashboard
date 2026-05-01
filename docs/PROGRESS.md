# Development Progress — HRIS Sprint 1

> Last updated: 2026-05-01 (session 2)
> Developer FE: Dum | Developer BE: (tim BE)
> Stack: Next.js 16 App Router, TypeScript, Shadcn UI, TanStack Table, Recharts, Zustand, React Hook Form + Zod

---

## Legend
- `[ ]` Todo
- `[~]` In Progress
- `[x]` Done
- `[!]` Blocked / Perlu diskusi

---

## Setup & Infrastruktur

- `[x]` Buat struktur folder `/app/(main)/dashboard/hris/` (nested di dashboard untuk reuse layout+sidebar)
- `[ ]` Setup TanStack Query untuk data fetching
- `[ ]` Buat base API client (axios/fetch wrapper + auth token)
- `[x]` Buat mock data sesuai API contract — `src/data/hris/employees.ts` (20 karyawan)
- `[x]` Setup role-based rendering helper — `src/hooks/use-role.ts`
- `[x]` Definisikan TypeScript types untuk semua entity — `src/types/hris.ts`
- `[x]` Tambah HRIS group ke sidebar navigation — `src/navigation/sidebar/sidebar-items.ts`

---

## Modul 1: HR Dashboard

**Route:** `/hris/dashboard`
**Priority:** High

### Layout & Shell
- `[x]` Halaman dashboard dengan page layout — `dashboard/hris/dashboard/page.tsx`
- `[ ]` Header filter (Period, Department, Location)
- `[ ]` Role check: render widget berbeda untuk HR Admin vs Manager
- `[ ]` MANAGER_SCOPE filter otomatis untuk role Manager

### Widget: Workforce Overview
- `[x]` Card: total headcount
- `[x]` Card: distribusi status (tetap/kontrak/probation) — via stat-cards
- `[x]` Card: kontrak hampir habis (computed dari mock data)
- `[x]` Card: onboarding berjalan

### Widget: Attendance & Time
- `[x]` Card: hadir hari ini (static mock)
- `[ ]` Card: keterlambatan
- `[ ]` Card: koreksi absensi pending
- `[ ]` Card: time off pending approval

### Widget: Turnover & Retention
- `[ ]` Chart: turnover rate 6 bulan
- `[ ]` Klasifikasi: resign/termination/contract end
- `[ ]` Tren per region

### Widget: Performance & KPI
- `[ ]` Distribusi KPI (on track / at risk / below)
- `[ ]` Karyawan dalam PIP
- `[ ]` Jadwal appraisal jatuh tempo

### Widget: Recruitment Pipeline
- `[ ]` Posisi aktif
- `[ ]` Jumlah pelamar per tahap
- `[ ]` Conversion rate

### Charts
- `[x]` Bar chart: karyawan per divisi — `workforce-breakdown.tsx`
- `[x]` Progress bar: distribusi tipe kontrak

### Interaksi
- `[ ]` Apply Filter → semua widget refresh
- `[ ]` Reset Filter
- `[ ]` Drill-down: klik widget → navigate ke modul terkait
- `[ ]` Export Dashboard (PDF/Excel) — HR Admin only
- `[ ]` Empty state handling
- `[ ]` Error state + retry button

---

## Modul 2: Employee Management

**Route:** `/hris/employees`
**Priority:** Very High (Core — dependensi semua modul lain)

### List View
- `[x]` Tabel karyawan dengan TanStack Table — `employee-table.tsx`
- `[x]` Kolom: NIP, nama+email, divisi, jabatan, cabang, tipe, status, join date, aksi
- `[x]` Filter: status, tipe kontrak, divisi, cabang
- `[x]` Search: nama / NIP
- `[x]` Pagination (10/20/30/50 per halaman)
- `[ ]` MANAGER_SCOPE: auto-filter untuk role Manager (read-only view)
- `[x]` Action per row: View Detail 👁, Edit ✏️, Delete 🗑 (tombol ada, belum ada handler)
- `[x]` Tombol: Tambah Karyawan, Import (belum ada modal/form)

### Add Employee (Onboarding Flow)
- `[ ]` Form step-by-step dengan progress indicator
- `[ ]` Step 1 — Data Dasar (Blocking)
- `[ ]` Step 2 — Role & Akses (Blocking)
- `[ ]` Step 3 — Schedule & Shift (Blocking)
- `[ ]` Step 4 — Opsional (KPI, dokumen)
- `[ ]` Tombol Activate Account: disabled sampai blocking lengkap
- `[ ]` Validasi Zod: NIP unik, email unik, format valid
- `[ ]` Conditional fields: Contract End Date / Probation End Date

### Detail View
**Route:** `/dashboard/hris/employees/[id]`
- `[x]` Informasi pribadi: email, HP, alamat, gender
- `[x]` Info pekerjaan: cabang, region, divisi, jabatan, tipe, join date, contract/probation end
- `[x]` Status & NIP badge
- `[x]` Onboarding progress bar + 5 step indicator
- `[ ]` Tab: Career History, Documents, Attendance Summary
- `[ ]` Photo upload (JPG/PNG, max 2MB)

### Edit Employee
- `[ ]` Semua field dapat di-edit oleh HR Admin
- `[ ]` Field terbatas untuk Employee self-edit
- `[ ]` Audit trail view

### Career Movement
- `[ ]` Form: jenis movement, jabatan/divisi/cabang baru, tanggal efektif
- `[ ]` History career movement

### Import / Export
- `[ ]` Import modal dengan file upload
- `[ ]` Export: download sesuai filter aktif

### Deactivate Employee
- `[ ]` Konfirmasi dialog
- `[ ]` Soft delete handler

---

## Modul 3: Time Management

### 3A. Sub-Modul: Time Off

**Route:** `/dashboard/hris/time-management/time-off`
**Priority:** Very High

#### List View
- `[x]` Tabel pengajuan cuti — `time-off/_components/leave-table.tsx`
- `[x]` Filter: status (Pending/Approved/Rejected/Cancelled), employee
- `[x]` Filter: leave type (Cuti Tahunan/Sakit/Melahirkan/Penting)
- `[x]` Action: View 👁, Approve ✔ + Reject ✖ (hanya ketika Pending)
- `[x]` Stat cards: Pending, Approved, Rejected, Total

#### Form Pengajuan Cuti (Employee)
- `[ ]` Fields: Leave Type, Start Date, End Date, Total Days (auto), Reason, Attachment
- `[ ]` Validasi Zod
- `[ ]` Submit → status Pending → notifikasi

#### Approval (HR Admin)
- `[ ]` Detail view dengan semua data pengajuan
- `[ ]` Tombol Approve / Reject dengan reason

#### View Tim (Manager)
- `[ ]` Kalender cuti tim (read-only)

#### Calendar View
- `[ ]` Tampilan kalender dengan event cuti

---

### 3B. Sub-Modul: Attendance

**Route:** `/dashboard/hris/time-management/attendance`
**Priority:** Critical

#### Dashboard Ringkasan
- `[x]` Card: On-time, Terlambat, Early Leave, Absent (hari ini) — `attendance/page.tsx`

#### Tabel Attendance
- `[x]` List karyawan dengan status kehadiran — `attendance/_components/attendance-table.tsx`
- `[x]` Kolom: nama, tanggal, check-in, check-out, durasi, shift, lokasi, status
- `[x]` Filter: status
- `[x]` Search by employee name
- `[x]` Tombol Export Data (belum ada handler)

#### Clock-In/Out (Employee View)
- `[ ]` Tombol Clock-In (GPS required)
- `[ ]` Tombol Clock-Out

#### Attendance Correction
- `[ ]` Form koreksi absensi
- `[ ]` Audit log edit manual

---

### 3C. Sub-Modul: Overtime (Lembur)

**Route:** `/dashboard/hris/time-management/overtime`
**Priority:** High

#### List View
- `[x]` Tabel lembur — `overtime/_components/overtime-table.tsx`
- `[x]` Filter: status (Pending HR/Approved/Rejected), employee
- `[x]` Action: View 👁, Approve ✔ + Reject ✖ (hanya ketika Pending HR)
- `[x]` Stat cards: Pending, Approved, Rejected, Total Jam Lembur

#### Form Assign Overtime (Manager)
- `[ ]` Fields: Employee, Date, Start/End Time, Duration (auto), Reason
- `[ ]` Validasi overlap + jam kerja
- `[ ]` Submit → Pending HR

#### Approval (HR Admin)
- `[ ]` Approve / Reject dengan alasan
- `[ ]` Kompensasi auto-calculated

---

### 3D. Sub-Modul: Schedule

**Route:** `/dashboard/hris/time-management/schedule`
**Priority:** High

#### List View
- `[x]` Tabel jadwal kerja — `schedule/_components/schedule-table.tsx`
- `[x]` Kolom: nama, tanggal, jam kerja, shift badge, lokasi, status
- `[x]` Filter: shift (Morning/Evening/Night)
- `[x]` Search by employee name
- `[x]` Stat cards: Total Aktif, Jadwal Hari Ini, Morning, Evening

#### Calendar View
- `[ ]` Tampilan kalender shift per karyawan
- `[ ]` Filter: tanggal, karyawan, divisi

#### Form Add Schedule (Manager/HR Admin)
- `[ ]` Fields: Employee, Date, Start/End Time, Shift Type, Location, Notes
- `[ ]` Validasi overlap
- `[ ]` Save → notifikasi ke employee

#### Edit Schedule
- `[ ]` Warning jika jadwal sudah berjalan
- `[ ]` Audit log

#### Bulk Upload
- `[ ]` Upload template Excel

---

## Notes & Blockers

| Tanggal | Note |
|---|---|
| 2026-05-01 | Sprint 1 dimulai. API contract dengan BE belum final. |
| 2026-05-01 | Selesai semua read-only list view: 3A Time Off, 3B Attendance, 3C Overtime, 3D Schedule. Build OK. |

---

## API Endpoints yang Dibutuhkan (Diskusi dengan BE)

### Employee
- `GET /employees` — list dengan filter & pagination
- `GET /employees/:id` — detail
- `POST /employees` — tambah karyawan
- `PUT /employees/:id` — update
- `PATCH /employees/:id/deactivate` — soft delete
- `GET /employees/:id/career-history` — riwayat career
- `POST /employees/:id/career-movement` — career movement
- `POST /employees/import` — bulk import
- `GET /employees/export` — export

### Dashboard
- `GET /dashboard/summary` — semua widget data (dengan filter role)

### Time Off
- `GET /time-off` — list pengajuan
- `POST /time-off` — submit pengajuan
- `PATCH /time-off/:id/approve` — approve
- `PATCH /time-off/:id/reject` — reject
- `DELETE /time-off/:id` — cancel/delete
- `GET /time-off/calendar` — data untuk calendar view

### Attendance
- `GET /attendance` — list data absensi
- `POST /attendance/clock-in` — clock-in
- `POST /attendance/clock-out` — clock-out
- `POST /attendance/correction` — correction request
- `PUT /attendance/:id` — HR koreksi manual

### Overtime
- `GET /overtime` — list lembur
- `POST /overtime` — assign lembur (Manager)
- `PATCH /overtime/:id/approve` — approve
- `PATCH /overtime/:id/reject` — reject
- `PATCH /overtime/:id/acknowledge` — acknowledge (Employee)

### Schedule
- `GET /schedules` — list jadwal
- `POST /schedules` — buat jadwal
- `PUT /schedules/:id` — edit jadwal
- `DELETE /schedules/:id` — hapus jadwal
- `POST /schedules/bulk` — bulk upload
