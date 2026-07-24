import { useState } from "react";
import { Search, Download, UserPlus, MoreVertical, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useStudents, useStudentStats } from "../model/useStudents";
import type { StudentListItem, StudentStatus } from "@features/admin/api/students";

const tabs = [
  { key: "all", label: "All Students", count: "1,284" },
  { key: "pending", label: "Courses Pending", count: "12", highlight: true },
  { key: "active", label: "Recently Active" },
  { key: "clubs", label: "Clubs Only" },
  { key: "graduated", label: "Graduated" },
];

const statusConfig: Record<StudentStatus, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: "ACTIVE", bg: "bg-emerald-500/10", text: "text-emerald-600", dot: "bg-emerald-500" },
  on_break: { label: "ON BREAK", bg: "bg-amber-500/10", text: "text-amber-600", dot: "bg-amber-500" },
  inactive: { label: "INACTIVE", bg: "bg-neutral-200", text: "text-neutral-600", dot: "bg-neutral-400" },
  invited: { label: "INVITED", bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
};

export function AdminStudentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const { data: students, isLoading } = useStudents({ search, department, tab: activeTab });
  const { data: stats } = useStudentStats();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-neutral-500 text-[13px] mb-1">
            <span>Admin</span>
            <span className="text-[10px]">&rsaquo;</span>
            <span className="text-black font-semibold">Students</span>
          </nav>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold text-black">Student Management</h2>
            <span className="bg-neutral-800 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {stats?.total ?? "—"} TOTAL
            </span>
          </div>
          <p className="text-neutral-500 text-sm mt-1 max-w-[700px]">
            Manage academic enrollment, student clubs, and administrative access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-neutral-100 text-neutral-800 text-[13px] font-medium px-4 py-2.5 rounded flex items-center gap-1.5 hover:bg-neutral-200 transition-colors">
            <Download className="h-4 w-4" />
            Export List
          </button>
          <button className="bg-black text-white text-[13px] font-medium px-4 py-2.5 rounded flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <UserPlus className="h-4 w-4" />
            Invite Student
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-neutral-200 flex items-center gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-1 text-[13px] font-medium whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-black text-black font-bold"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  tab.highlight
                    ? "bg-red-100 text-red-600"
                    : activeTab === tab.key
                      ? "bg-neutral-800 text-white"
                      : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </section>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between bg-neutral-50/50 border-b border-neutral-200">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="flex-1 md:flex-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">Department</option>
              <option value="cs">Computer Science</option>
              <option value="business">Business</option>
              <option value="engineering">Engineering</option>
              <option value="arts">Design Arts</option>
            </select>
            <select className="flex-1 md:flex-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none">
              <option>Year</option>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-8 space-y-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-neutral-100 rounded" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 text-neutral-500 border-b border-neutral-200">
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider w-10">
                    <input type="checkbox" className="rounded border-neutral-300" />
                  </th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider">Student Name</th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider">Student ID</th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider">Courses</th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider">Department</th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {students?.map((student) => (
                  <StudentRow key={student.id} student={student} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-neutral-200 bg-neutral-50/50">
          <span className="text-xs text-neutral-500">
            Showing <span className="font-bold text-black">1 - 10</span> of {stats?.total ?? "—"} students
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded border border-neutral-200 hover:bg-white text-neutral-400 disabled:opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-black text-white text-[13px] font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white border border-transparent hover:border-neutral-200 text-[13px]">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white border border-transparent hover:border-neutral-200 text-[13px]">
              3
            </button>
            <span className="px-1 text-neutral-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white border border-transparent hover:border-neutral-200 text-[13px]">
              129
            </button>
            <button className="p-1.5 rounded border border-neutral-200 hover:bg-white text-neutral-500">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats bento */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Growth card */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-neutral-500">Growth Rate</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold">{stats.growthRate}</div>
            <div className="h-16 flex items-end gap-0.5 mt-3">
              {[20, 40, 35, 60, 85].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm ${i >= 3 ? "bg-black" : "bg-neutral-100"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Department distribution */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-neutral-500">Department Distribution</span>
              <button className="text-xs text-blue-600 hover:underline">View Full Report</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.departments.map((dept) => (
                <div key={dept.abbreviation} className="flex flex-col gap-1">
                  <span className="text-[13px] font-medium text-black">{dept.abbreviation}</span>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round((dept.count / stats.total) * 100)}%`,
                        backgroundColor: dept.color,
                      }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">{dept.count} Students</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentRow({ student }: { student: StudentListItem }) {
  const status = statusConfig[student.status];
  const courseColors = ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-purple-100 text-purple-600", "bg-orange-100 text-orange-600", "bg-red-100 text-red-600"];

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-5 py-3">
        <input type="checkbox" className="rounded border-neutral-300" />
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-sm font-medium text-neutral-500">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="text-[13px] font-bold text-black">{student.name}</div>
            <div className="text-xs text-neutral-500">{student.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 text-sm font-mono text-neutral-500">{student.studentId}</td>
      <td className="px-5 py-3">
        <div className="flex -space-x-2">
          {student.courses.slice(0, 2).map((course, i) => (
            <span
              key={course}
              className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${courseColors[i % courseColors.length]}`}
            >
              {course}
            </span>
          ))}
          {student.courses.length > 2 && (
            <span className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 border-2 border-white flex items-center justify-center text-[10px] font-bold">
              +{student.courses.length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="px-5 py-3 text-sm">{student.department}</td>
      <td className="px-5 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-1.5`} />
          {status.label}
        </span>
      </td>
      <td className="px-5 py-3 text-right">
        <button className="text-neutral-400 hover:text-black transition-colors">
          <MoreVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
