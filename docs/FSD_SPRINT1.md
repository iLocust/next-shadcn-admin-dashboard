# FSD Sprint 1 — HRIS Project

> Sumber: Functional Specification Document (FSD) dari Google Docs, dikonversi Docs to Markdown.
> Sprint 1 mencakup 3 modul: HR Dashboard, Employee Management, Time Management.

---

## Roles & Access Overview

| Role | Akses |
|---|---|
| HR Admin | Full access semua data, semua cabang |
| Manager | Terbatas MANAGER_SCOPE (region/cabang yang di-assign) |
| Employee | Hanya data pribadi sendiri |
| Owner/Superadmin | Override semua keputusan |

---

## 4.1 HR Dashboard

### Purpose
Halaman utama HRIS — gambaran kondisi SDM real-time. Dua varian: HR Admin (full) dan Manager (scoped by MANAGER_SCOPE).

### 5 Widget MVP

| Widget | Data | Sumber |
|---|---|---|
| Workforce Overview | Total headcount, distribusi status (tetap/kontrak/probation), kontrak hampir habis, onboarding berjalan | Employee Management |
| Attendance & Time | Kehadiran hari ini per cabang, keterlambatan, koreksi pending, time off pending | Time Management |
| Turnover & Retention | Turnover rate 6 bulan, klasifikasi (resign/termination/contract end), tren per region | Employee Mgmt + Separation |
| Performance & KPI | Distribusi KPI (on track/at risk/below), PIP, jadwal appraisal jatuh tempo | Performance Management |
| Recruitment Pipeline | Posisi aktif, pelamar per tahap, conversion rate | Employee Management (historis) |

### Use Cases

**UC-4.1.3.1 HR Admin**
- Trigger: Login → sistem tampilkan dashboard
- Filter: Semua Cabang → Region → Kota → Cabang spesifik
- Drill-down: klik widget → buka modul terkait
- Extensions: E1 data gagal load → retry | E2 no data → empty state | E3 pending approval > threshold → alert banner

**UC-4.1.3.2 Manager**
- Trigger: Login → buka menu Dashboard
- Pre-condition: MANAGER_SCOPE sudah di-assign
- Sistem otomatis filter data berdasarkan MANAGER_SCOPE
- Extensions: E1 MANAGER_SCOPE belum dikonfigurasi → arahkan ke Superadmin | E2 akses luar scope → ditolak + audit log

### Functional Requirements (DB-01 s/d DB-17)

| Spec ID | Deskripsi | Business Rule |
|---|---|---|
| DB-01 | Tampilkan total karyawan | Employee aktif saja |
| DB-02 | Distribusi karyawan berdasarkan gender | Profil employee |
| DB-03 | Status karyawan (active/inactive/probation) | Employment status |
| DB-04 | Summary attendance (present/late/absent) | Time Management |
| DB-05 | Jumlah karyawan cuti | Time Off (approved) |
| DB-06 | Notifikasi penting | Announcement + Time Off |
| DB-07 | KPI summary | Performance Management |
| DB-08 | Grafik HR (trend karyawan) | Employee historis |
| DB-09 | Filter dashboard (periode/departemen) | Mempengaruhi semua widget |
| DB-10 | Data real-time | Sinkron database |
| DB-11 | Akses berdasarkan role | HR full, Manager terbatas |
| DB-12 | Top performer | Data KPI |
| DB-13 | Attendance hari ini | Attendance harian |
| DB-14 | Upcoming event | Calendar |
| DB-15 | Warning/alert (banyak telat) | Attendance rule trigger |
| DB-16 | Drill-down ke detail | Klik widget buka modul |
| DB-17 | Simpan preferensi tampilan | User setting |

### Fields

| Field | Type | Required | Default | Validation |
|---|---|---|---|---|
| Period | Date Range | Yes | Current Month | Format tanggal valid |
| Department | Dropdown | No | All | Harus department valid |
| Employee | Dropdown | No | All | Harus employee aktif |
| Employment Status | Dropdown | No | Active | Active/Inactive/Probation |
| Chart Type | Dropdown | No | Bar Chart | Tipe chart valid |
| Data Grouping | Dropdown | No | Monthly | Daily/Weekly/Monthly |
| KPI Period | Dropdown | No | Current | Periode valid |
| Location | Dropdown | No | All | Lokasi valid |
| Search | Text | No | - | Max 100 karakter |
| Refresh Interval | Dropdown | No | Auto | Manual/Auto |

### Buttons & Actions

| Label | Role | Action |
|---|---|---|
| Apply Filter | All | Terapkan filter |
| Reset Filter | All | Reset ke default |
| Refresh | All | Refresh data |
| Export Dashboard | HR/Admin | Export PDF/Excel |
| View Detail (👁) | All | Drill-down ke modul |
| Notification Bell 🔔 | All | Tampilkan notifikasi (auto) |
| Settings ⚙️ | HR/Admin | Pengaturan dashboard |
| Chart Toggle | All | Ubah tipe chart |
| Fullscreen ⛶ | All | Tampilan full screen |
| Download ⬇️ | All | Download report |

---

## 4.2 Employee Management

### Purpose
Core module HRIS — semua modul lain bergantung ke sini. Mengelola siklus data karyawan: onboarding, pemeliharaan data, career movement, hingga separation.

### Cakupan
- Data personal karyawan
- Onboarding checklist (hybrid blocking)
- Riwayat career movement (promosi, mutasi, demosi)
- Attendance correction request
- Import/export data massal

### Onboarding Flow (Hybrid Blocking)

| Step | Blocking? | Keterangan |
|---|---|---|
| Data dasar (nama, posisi, cabang, divisi) | Ya | Akun tidak aktif sebelum ini selesai |
| Role & akses sistem | Ya | Harus di-assign agar bisa login |
| Assign schedule & shift | Ya | Karyawan harus punya jadwal sebelum clock-in |
| Assign KPI pertama | Tidak | Bisa dilengkapi dalam periode probation |
| Upload dokumen (kontrak, NDA) | Tidak | Disarankan sebelum hari pertama kerja |

### Use Cases

**UC-4.2.3.1 HR Admin**
- A. Add Employee & Onboarding: form step-by-step → isi data blocking → Activate Account → kirim kredensial → lengkapi data opsional
- B. Edit Employee Data: pilih karyawan → edit → simpan + audit trail (nilai sebelum & sesudah)
- C. Career Movement: pilih karyawan → klik Career Movement → isi jenis/jabatan baru/tanggal efektif → simpan + update data aktif
- Extensions: E1 data tidak valid | E2 duplicate NIP | E3 import massal gagal → error log per record | E4 aktivasi sebelum data blocking lengkap

**UC-4.2.3.2 Manager**
- Read-only view, scoped ke region/cabang
- Filter: divisi, status
- Tidak dapat edit data

**UC-4.2.3.3 Employee**
- A. View Profile: data personal, job info, jadwal, saldo cuti, KPI pribadi
- B. Update Data Pribadi: field terbatas (alamat, nomor HP, email pribadi) → beberapa perlu approval HR
- Extensions: E1 field non-editable di-disable | E2 format tidak valid → tolak submit

### Functional Requirements (EMP-01 s/d EMP-14)

| Spec ID | Deskripsi | Role | Business Rule |
|---|---|---|---|
| EMP-01 | Add karyawan dengan onboarding checklist hybrid | HR Admin | Data blocking lengkap sebelum akun aktif |
| EMP-02 | Update data karyawan | HR Admin | Perubahan tercatat audit trail |
| EMP-03 | Deactivate karyawan (soft delete) | HR Admin, Owner | Tidak boleh hard delete |
| EMP-04 | List karyawan dengan filter & search | HR Admin, Manager | Manager hanya lihat scope-nya |
| EMP-05 | Catat riwayat career movement | HR Admin | Simpan jabatan/divisi/cabang lama & baru + tanggal efektif |
| EMP-06 | Simpan foto karyawan | HR Admin | Format JPG/PNG, maks 2MB |
| EMP-07 | Validasi NIP unik | System | NIP tidak boleh duplikat |
| EMP-08 | Import data massal | HR Admin | Format Excel/CSV sesuai template; duplicate/invalid ditolak |
| EMP-09 | Export data karyawan | HR Admin | Data sesuai filter |
| EMP-10 | Tampilkan onboarding checklist progress | HR Admin | % completion per karyawan baru |
| EMP-11 | Blokir aktivasi jika data blocking belum lengkap | System | Validasi sebelum tombol Activate aktif |
| EMP-12 | Batasi akses berdasarkan MANAGER_SCOPE | System | Manager hanya lihat region/cabang-nya |
| EMP-13 | Histori perubahan data (audit trail) | System | Semua perubahan wajib tercatat, tidak bisa dihapus |
| EMP-14 | Employee update data pribadi terbatas | Employee | Perubahan tertentu perlu approval HR |

### Fields

| Field | Type | Required | Role Access | Default | Validation |
|---|---|---|---|---|---|
| Full Name | Text | Ya | HR Admin | - | Max 100 karakter |
| NIP | Text (auto) | Ya | System | Auto-generate | Unik |
| Photo | Image Upload | Tidak | HR Admin | - | JPG/PNG, maks 2MB |
| Branch (Cabang) | Dropdown | Ya | HR Admin | - | Master data cabang |
| Region | Auto (dari cabang) | Ya | System | Auto | Terisi otomatis dari cabang |
| Division | Dropdown | Ya | HR Admin | - | Master data divisi |
| Job Position | Dropdown | Ya | HR Admin | - | Struktur jabatan valid |
| Employment Type | Dropdown | Ya | HR Admin | Tetap | Tetap/Kontrak/Probation |
| Join Date | Date Picker | Ya | HR Admin | Today | Tidak boleh lebih dari hari ini |
| Email (Sistem) | Text | Ya | HR Admin | - | Format email valid, unik |
| Phone Number | Text | Ya | HR Admin | - | Format angka, min 10 digit |
| Address | Textarea | Tidak | Employee (terbatas) | - | Maks 255 karakter |
| Contract End Date | Date Picker | Jika Kontrak | HR Admin | - | Wajib jika tipe Kontrak |
| Probation End Date | Date Picker | Jika Probation | HR Admin | - | Wajib jika tipe Probation |
| Status | Auto | Ya | System | Active | Active/Inactive/Probation |

### Buttons & Actions

| Label | Role | Validation | Action |
|---|---|---|---|
| Add Employee | HR Admin | - | Buka form tambah karyawan |
| Save | HR Admin | Semua field wajib & valid | Simpan ke database |
| Update | HR Admin | Validasi perubahan | Update data karyawan |
| Delete | HR Admin | Konfirmasi | Deactivate karyawan |
| Import Data | HR Admin | Format sesuai template | Upload massal |
| Export Data | HR Admin | - | Download data karyawan |
| Upload Document | HR Admin | Format file valid | Upload dokumen |
| 👤 View Detail | HR/Admin/Manager | - | Tampilkan detail karyawan |
| ✏️ Edit Icon | HR Admin | - | Masuk mode edit |
| 🗑 Delete Icon | HR Admin | Konfirmasi | Hapus / deactivate |

---

## 4.3 Time Management

### Purpose
Modul yang mengelola seluruh aktivitas waktu karyawan. Terdiri dari 4 sub-modul:
1. **Time Off** — cuti, izin, hari libur (Approval Skenario C)
2. **Attendance** — pencatatan dan koreksi kehadiran
3. **Overtime (Lembur)** — pengajuan dan approval lembur
4. **Schedule** — penjadwalan shift kerja per cabang

---

### 4.3.2 Sub-Modul: Time Off

#### Approval Flow — Skenario C

| Tahap | Aktor | Keterangan |
|---|---|---|
| 1 | Employee | Submit. Sistem cek kuota otomatis sebelum dikirim ke approver |
| 2 | Manager (scope region) | Review. Jika tidak ada Manager → langsung ke HR Admin |
| 3 | HR Admin | Final authority, dapat override kapanpun |
| Override | Owner | Override semua keputusan, wajib isi alasan |

#### Use Cases

**UC-4.3.2.1.1 HR Admin**
- A. Create Time Off: klik Create → input jenis & tanggal → save → update calendar
- B. Approve/Reject: buka request → review → approve/reject (alasan wajib jika reject) → update status
- C. Override/Koreksi: buka data → edit tanggal/status → simpan → catat log
- Extensions: E1 data tidak lengkap → reject | E2 tanggal bentrok → warning | E3 override → audit log wajib | E4 employee tidak aktif → ditolak

**UC-4.3.2.1.2 Manager**
- View only: kalender cuti tim, list employee yang cuti
- Filter: tanggal, tim
- Melihat: jumlah cuti, overlap cuti

**UC-4.3.2.1.3 Employee**
- A. Submit Leave Request: buka Time Off → Apply Leave → isi form → validasi saldo → Submit → status Pending → notifikasi ke HR
- B. View Leave Status: Pending / Approved / Rejected
- C. Cancel Leave Request: hanya bisa jika masih Pending
- Extensions: E1 saldo tidak cukup → ditolak | E2 tanggal overlap → warning | E3 form tidak lengkap → tidak bisa submit | E4 sudah di-approve → tidak bisa dibatalkan

#### Functional Requirements — Time Off (TO-01 s/d TO-10)

| Spec ID | Deskripsi | Role | Business Rule |
|---|---|---|---|
| TO-01 | Pengajuan cuti | Employee | Form wajib lengkap |
| TO-02 | Validasi saldo cuti | System | Saldo ≥ 0 |
| TO-03 | Approval cuti | Manager | Wajib decision |
| TO-04 | Override cuti | Superadmin | Audit log |
| TO-05 | Update saldo cuti otomatis | System | Real-time |
| TO-06 | Cegah overlap tanggal | System | Tidak boleh overlap |
| TO-07 | Tampilkan data cuti tim | Manager | Role-based |
| TO-08 | Integrasi ke payroll | System | Mandatory |
| TO-09 | Sinkron ke kalender | System | Auto |
| TO-10 | Kirim notifikasi | System | Email/in-app |

#### Fields — Time Off

| Field | Type | Required | Role | Validation |
|---|---|---|---|---|
| Employee Name | Dropdown | Yes | Superadmin | Active only |
| Leave Type | Dropdown | Yes | All | Enum |
| Start Date | Date | Yes | All | Valid date |
| End Date | Date | Yes | All | ≥ Start Date |
| Total Days | Auto | Yes | System | Auto-calculated |
| Leave Balance | Auto | Yes | System | ≥ 0 |
| Reason | Textarea | Yes | All | Min 5 char |
| Attachment | File | No | Employee | PDF/JPG |
| Status | Auto | Yes | System | Pending/Approved/Rejected |

#### Buttons — Time Off

| Label | Role | Validation | Action |
|---|---|---|---|
| Apply Leave | Employee | Form lengkap, saldo cukup, tidak overlap | Submit + kirim ke Manager |
| Approve | HR Admin | Data valid, saldo cukup | Status → Approved, update saldo, notifikasi |
| Reject | HR Admin | Alasan wajib diisi | Status → Rejected + notifikasi |
| Cancel | Employee | Status masih Pending | Batalkan pengajuan |
| Edit ✏️ | HR Admin | Data tersedia | Koreksi data cuti |
| Delete 🗑 | HR Admin | Konfirmasi | Soft delete + audit log |
| View Detail 👁 | All | Data tersedia | Detail pengajuan |
| Upload Attachment | Employee | PDF/JPG/PNG | Upload dokumen pendukung |
| Download Attachment | HR Admin | File tersedia | Download dokumen |
| Export Data | HR Admin | Data tersedia | Excel/PDF |

---

### 4.3.3 Sub-Modul: Attendance

#### Use Cases

**UC-4.3.3.1.1 HR Admin**
- Monitoring & Koreksi: buka Attendance → filter → pilih karyawan → edit/koreksi → validasi → simpan + audit log
- Extensions: E1 data tidak valid → ditolak | E2 edit manual → wajib audit trail | E3 schedule tidak tersedia → warning

**UC-4.3.3.1.2 Manager**
- Monitoring kehadiran tim (read-only): filter periode/status → lihat On-time/Late/Early leave

**UC-4.3.3.1.3 Employee**
- A. Clock-In: buka Attendance → lihat jadwal → Clock-In → sistem catat timestamp + lokasi → status On-time/Late
- B. Clock-Out: Clock-Out → catat timestamp → hitung total durasi kerja
- C. Attendance Correction Request: temukan ketidaksesuaian → Request Correction → isi tanggal + jam benar + alasan → Pending → notifikasi HR
- Extensions: E1 GPS tidak valid → gagal clock-in | E2 duplicate → ditolak | E3 koneksi gagal → retry

#### Functional Requirements — Attendance (AT-01 s/d AT-10)

| Spec ID | Deskripsi | Role | Business Rule |
|---|---|---|---|
| AT-01 | Check-in | Employee | GPS valid |
| AT-02 | Check-out | Employee | 1x per hari |
| AT-03 | Catat waktu otomatis | System | Timestamp system |
| AT-04 | Tentukan status kehadiran | System | Berdasarkan schedule |
| AT-05 | Cegah duplicate attendance | System | 1 record/hari |
| AT-06 | Monitoring attendance | Manager | Data tim saja |
| AT-07 | Koreksi data | Superadmin | Audit log wajib |
| AT-08 | Tandai anomali (late/early) | System | Late/Early leave |
| AT-09 | Integrasi ke payroll | System | Mandatory |
| AT-10 | Filter & pencarian | All | Parameter valid |

#### Fields — Attendance

| Field | Type | Required | Role | Validation |
|---|---|---|---|---|
| Employee Name | Auto | Yes | System | Valid |
| Check-in Time | Auto | Yes | System | Timestamp |
| Check-out Time | Auto | Yes | System | Timestamp |
| Location | GPS | Yes | Employee | Valid lokasi |
| Status | Auto | Yes | System | On-time/Late/Early Leave |
| Shift | Dropdown | Yes | System | Valid |
| Notes | Textarea | No | All | Optional |
| Date | Date | Yes | System | Valid |

#### Buttons — Attendance

| Label | Role | Validation | Action |
|---|---|---|---|
| Check-in | Employee | GPS valid, belum check-in | Simpan waktu masuk |
| Check-out | Employee | Sudah check-in | Simpan waktu keluar |
| Edit ✏️ | HR Admin | Data tersedia | Edit attendance |
| View 👁 | All | Data tersedia | Lihat detail |
| Filter | All | Parameter valid | Filter data |
| Export Data | HR Admin | Data tersedia | Export laporan |
| Refresh | All | - | Reload data |

---

### 4.3.4 Sub-Modul: Overtime (Lembur)

#### Use Cases

**UC-4.3.4.1.1 Manager**
- Assign Overtime: buka Overtime → Assign Overtime → pilih employee + tanggal + jam → isi alasan → Submit → status Pending HR → notifikasi HR & Employee
- Extensions: E1 employee cuti → tidak bisa assign | E2 jadwal bentrok → ditolak | E3 jam tidak valid → error

**UC-4.3.4.1.1 HR Admin**
- Approval: buka Overtime → lihat daftar → pilih request → validasi jam & kebijakan → hitung kompensasi → Approve/Reject (wajib alasan) → notifikasi
- Extensions: E1 data tidak valid → reject | E2 melebihi batas → warning | E3 reject tanpa alasan → error

**UC-4.3.4.1.2 Employee**
- View only: menerima notifikasi → lihat detail lembur → (optional) Acknowledge → setelah HR approve → lihat status & kompensasi
- Extensions: E1 tidak tersedia → eskalasi | E2 tidak acknowledge → tetap tercatat

#### Functional Requirements — Overtime (OT-01 s/d OT-22)

| Spec ID | Deskripsi | Role | Business Rule |
|---|---|---|---|
| OT-01 | Manager buat assignment lembur | Manager | Employee aktif & dalam tim |
| OT-02 | Pilih employee untuk lembur | Manager | Struktur organisasi |
| OT-03 | Validasi schedule employee | System | Tidak sedang cuti/libur |
| OT-04 | Validasi jam lembur | System | Di luar jam kerja normal |
| OT-05 | Cegah overlap lembur | System | Tidak bentrok schedule/time off |
| OT-06 | Simpan data lembur | System | Structured data |
| OT-07 | Notifikasi ke HR & Employee | System | Real-time |
| OT-08 | Tampilkan daftar lembur | HR Admin | Berdasarkan periode |
| OT-09 | Tampilkan detail lembur | HR Admin | Data lengkap |
| OT-10 | HR approval lembur | HR Admin | Role-based |
| OT-11 | HR reject lembur | HR Admin | Wajib alasan |
| OT-12 | Hitung durasi otomatis | System | End time – start time |
| OT-13 | Hitung kompensasi | System | Berdasarkan policy lembur |
| OT-14 | Update status | System | Pending → Approved/Rejected |
| OT-15 | Notifikasi hasil approval | System | Ke Manager & Employee |
| OT-16 | Tampilkan lembur ke employee | Employee | View-only |
| OT-17 | Employee acknowledge | Employee | Optional |
| OT-18 | Audit log | System | Mandatory |
| OT-19 | Cegah perubahan setelah approval | System | Status lock |
| OT-20 | Filter lembur | HR, Manager | Periode, employee |
| OT-21 | Integrasi payroll | System | Approved only |
| OT-22 | Laporan lembur | HR, Manager | Reporting integration |

---

### 4.3.5 Sub-Modul: Schedule

#### Use Cases

**UC-4.3.5.1.1 HR Admin** — Monitoring: lihat seluruh jadwal, analisis
**UC-4.3.5.1.2 Manager** — Create/Update Schedule: buka Schedule → Add Schedule → pilih employee + tanggal + shift → Save → notifikasi employee
**UC-4.3.5.1.3 Employee** — View only: kalender jadwal, shift kerja, jam masuk & pulang, filter tanggal

#### Functional Requirements — Schedule (SC-01 s/d SC-10)

| Spec ID | Deskripsi | Role | Business Rule |
|---|---|---|---|
| SC-01 | Buat jadwal kerja | HR Admin / Manager | HR dan Manager |
| SC-02 | Assign jadwal ke karyawan | HR Admin / Manager | Karyawan aktif |
| SC-03 | Cegah jadwal overlap | System | Tidak boleh bentrok |
| SC-04 | Tampilkan jadwal tim | Manager | Role-based |
| SC-05 | Tampilkan jadwal pribadi | Employee | Data personal |
| SC-06 | Pengaturan shift | HR Admin / Manager | Configurable |
| SC-07 | Sinkron dengan attendance | System | Mandatory |
| SC-08 | Sinkron dengan calendar | System | Auto |
| SC-09 | Bulk upload jadwal | HR Admin / Manager | Template |
| SC-10 | Catat perubahan jadwal | System | Audit log |

#### Fields — Schedule

| Field | Type | Required | Role | Validation |
|---|---|---|---|---|
| Employee Name | Dropdown | Yes | Superadmin | Active only |
| Date | Date | Yes | Superadmin | Valid date |
| Start Time | Time | Yes | Superadmin | Valid |
| End Time | Time | Yes | Superadmin | > Start Time |
| Shift Type | Dropdown | Yes | Superadmin | Morning/Evening |
| Location | Dropdown | No | Superadmin | Optional |
| Notes | Textarea | No | Superadmin | Optional |
| Status | Auto | Yes | System | Active |

---

## Catatan Penting untuk FE

1. **Employee Management adalah dependensi utama** — jangan build Attendance sebelum Employee selesai
2. **MANAGER_SCOPE harus dihandle di FE** — filter otomatis berdasarkan role di setiap modul
3. **Approval flow Time Off (Skenario C)** — Employee → Manager → HR Admin → Owner (override)
4. **Semua delete adalah soft delete** — tidak ada hard delete di Employee maupun Time Off
5. **Audit trail** — ditangani BE, tapi FE harus menampilkan nilai sebelum/sesudah di history
6. **GPS untuk Attendance** — FE perlu request geolocation permission
7. **Real-time data** — dashboard perlu refresh mechanism (auto/manual)
