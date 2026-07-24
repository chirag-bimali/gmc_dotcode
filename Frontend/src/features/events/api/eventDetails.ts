import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type EventOrganizer = {
  id: string;
  name: string;
  role: string;
};

export type EventDetail = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  club: { id: string; name: string };
  location: string;
  address: string;
  date: string;
  day: string;
  month: string;
  weekday: string;
  time: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "ongoing" | "past";
  organizer: EventOrganizer;
  attendeeCount: number;
  coverImage: string;
};

export function getEventDetails(eventId: string) {
  return http.get<ApiResponse<EventDetail>>(`/events/${eventId}`);
}
