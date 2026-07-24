import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@features/events/api/events";

type UseEventsParams = {
  filter?: string;
  sort?: string;
};

export function useEvents(params: UseEventsParams) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEvents(params).then((res) => res.data.data!),
  });
}
