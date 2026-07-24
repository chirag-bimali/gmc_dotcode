import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type ClubAdmin = {
  id: string;
  name: string;
  role: string;
};

export type ClubEvent = {
  id: string;
  month: string;
  day: string;
  title: string;
  subtitle: string;
};

export type ClubStat = {
  label: string;
  value: string;
};

export type ClubDetail = {
  id: string;
  name: string;
  description: string;
  about: string;
  category: string;
  privacy: "public" | "private";
  memberCount: number;
  coverImage: string;
  admins: ClubAdmin[];
  upcomingEvents: ClubEvent[];
  stats: ClubStat[];
};

export function getClubDetails(clubId: string) {
  return http.get<ApiResponse<ClubDetail>>(`/clubs/${clubId}`);
}
