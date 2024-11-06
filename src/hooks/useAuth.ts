import { useQuery } from "@tanstack/react-query";
import { getuser } from "@/api/AuthAPI";

export const useAuth = () => {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getuser,
    retry: 1,
    refetchOnWindowFocus: false
  })
  return { data, isError, isLoading }
}
