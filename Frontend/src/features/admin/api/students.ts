import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type StudentStatus = "active" | "on_break" | "inactive" | "invited";

export type StudentListItem = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  status: StudentStatus;
  courses: string[];
};

export type StudentsListResponse = StudentListItem[];

export type StudentStats = {
  total: number;
  growthRate: string;
  departments: { name: string; abbreviation: string; count: number; color: string }[];
};

export function getStudents(params?: { search?: string; department?: string; tab?: string }) {
  return http.get<ApiResponse<StudentsListResponse>>("/admin/students", { params });
}

export function getStudentStats() {
  return http.get<ApiResponse<StudentStats>>("/admin/students/stats");
}

export function inviteStudent(data: { email: string; faculty?: string }) {
  return http.post<ApiResponse<{ id: string }>>("/admin/students/invite", data);
}
