import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type Club = {
  id: string;
  name: string;
  description: string;
  category: string;
  privacy: "public" | "private";
  memberCount: number;
  coverImage: string;
  icon: string;
};

export type ClubsResponse = Club[];

export function getClubs(params?: { search?: string; category?: string; sort?: string }) {
  return http.get<ApiResponse<ClubsResponse>>("/clubs", { params });
}
