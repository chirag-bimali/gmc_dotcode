import { http } from "@shared/api/http";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type CompleteProfileRequest = {
  bio?: string;
  faculty?: string;
  department?: string;
  batch?: string;
  interests?: string[];
  socialLinks?: { platform: string; url: string }[];
};

export type CompleteProfileResponse = {
  id: string;
  email: string;
  name: string;
  bio: string;
  faculty: string;
  department: string;
  batch: string;
  interests: string[];
  socialLinks: { platform: string; url: string }[];
  profileCompleted: boolean;
};

export function completeProfile(data: CompleteProfileRequest) {
  return http.put<ApiResponse<CompleteProfileResponse>>("/profile/complete", data);
}
