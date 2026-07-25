import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  createAdminClub,
  getAdminClubs,
  getAdminClubStats,
  type CreateAdminClubRequest,
} from "@features/admin/api/clubs";

type UseClubManagementParams = {
  search?: string;
  category?: string;
  status?: string;
};

export function useClubManagement(params: UseClubManagementParams) {
  return useQuery({
    queryKey: ["admin-clubs", params],
    queryFn: () => getAdminClubs(params).then((res) => res.data.data!),
  });
}

export function useClubManagementStats() {
  return useQuery({
    queryKey: ["admin-clubs-stats"],
    queryFn: () => getAdminClubStats().then((res) => res.data.data!),
  });
}

export function useCreateClub() {
  return useMutation({
    mutationFn: (data: CreateAdminClubRequest) => createAdminClub(data).then((res) => res.data.data!),
  });
}