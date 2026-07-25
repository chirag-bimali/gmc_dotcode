import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type AdminClubStatus = "active" | "pending" | "archived";

export type AdminClubListItem = {
  id: string;
  name: string;
  category: string;
  status: AdminClubStatus;
  memberCount: number;
  visibility: "Public" | "Private";
  eventCount: number;
  manager: string;
  icon: string;
};

export type CreateAdminClubRequest = {
  name: string;
  category: string;
  status: AdminClubStatus;
  visibility: "Public" | "Private";
  description: string;
  manager: string;
  icon: string;
};

export type AdminClubStats = {
  total: number;
  pendingReview: number;
  activeEvents: number;
  verified: number;
};

export function getAdminClubs(params?: { search?: string; category?: string; status?: string }) {
  return http.get<ApiResponse<AdminClubListItem[]>>("/admin/clubs", { params });
}

export function getAdminClubStats() {
  return http.get<ApiResponse<AdminClubStats>>("/admin/clubs/stats");
}

export function createAdminClub(data: CreateAdminClubRequest) {
  return http.post<ApiResponse<AdminClubListItem>>("/admin/clubs", data);
}