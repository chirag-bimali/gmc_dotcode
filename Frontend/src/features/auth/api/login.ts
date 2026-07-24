import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";
import type { UserRole } from "@shared/store/auth-store";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
};

export function login(data: LoginRequest) {
  return http.post<ApiResponse<LoginResponse>>("/auth/login", data);
}
