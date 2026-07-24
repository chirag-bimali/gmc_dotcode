import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentStats } from "@features/admin/api/students";

type UseStudentsParams = {
  search?: string;
  department?: string;
  tab?: string;
};

export function useStudents(params: UseStudentsParams) {
  return useQuery({
    queryKey: ["admin-students", params],
    queryFn: () => getStudents(params).then((res) => res.data.data!),
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: ["admin-students-stats"],
    queryFn: () => getStudentStats().then((res) => res.data.data!),
  });
}
