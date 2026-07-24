import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type EventListItem = {
  id: string;
  title: string;
  club: { id: string; name: string };
  location: string;
  time: string;
  day: string;
  month: string;
  attendees: number;
  coverImage: string;
};

export function getEvents(params?: { filter?: string; sort?: string }) {
  return http.get<ApiResponse<EventListItem[]>>("/events", { params });
}
