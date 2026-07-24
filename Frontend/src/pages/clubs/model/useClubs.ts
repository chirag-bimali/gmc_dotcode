import { useQuery } from "@tanstack/react-query";
import { getClubs } from "@features/clubs/api/clubs";

type UseClubsParams = {
  search?: string;
  category?: string;
  sort?: string;
};

export function useClubs(params: UseClubsParams) {
  return useQuery({
    queryKey: ["clubs", params],
    queryFn: () => getClubs(params).then((res) => res.data.data!),
  });
}
