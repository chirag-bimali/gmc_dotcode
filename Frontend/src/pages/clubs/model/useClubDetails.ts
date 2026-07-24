import { useQuery } from "@tanstack/react-query";
import { getClubDetails } from "@features/clubs/api/clubDetails";

export function useClubDetails(clubId: string) {
  return useQuery({
    queryKey: ["club", clubId],
    queryFn: () => getClubDetails(clubId).then((res) => res.data.data!),
  });
}
