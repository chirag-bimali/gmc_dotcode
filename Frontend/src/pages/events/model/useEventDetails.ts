import { useQuery } from "@tanstack/react-query";
import { getEventDetails } from "@features/events/api/eventDetails";

export function useEventDetails(eventId: string) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventDetails(eventId).then((res) => res.data.data!),
  });
}
