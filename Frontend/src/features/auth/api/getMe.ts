import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";
import type { UserRole } from "@shared/store/auth-store";

export type MeResponse = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export function getMe() {
  return http.get<ApiResponse<MeResponse>>("/auth/me");
}
