import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type VerifyInviteResponse = {
  email: string;
  universityName: string;
  expiresAt: string;
};

export type AcceptInviteRequest = {
  token: string;
  name?: string;
  password: string;
};

export type AcceptInviteResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "Student";
  };
};

export function verifyInvite(token: string) {
  return http.get<ApiResponse<VerifyInviteResponse>>(`/invitations/verify`, {
    params: { token },
  });
}

export function acceptInvite(data: AcceptInviteRequest) {
  return http.post<ApiResponse<AcceptInviteResponse>>("/invitations/accept", data);
}
