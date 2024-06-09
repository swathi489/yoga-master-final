import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser, isLoading, isError, error, refetch } = useQuery(
    ['user', user?.email],
    async () => {
      try {
        const res = await axiosSecure.get(`/user/${user?.email}`);
        return res.data;
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
    },
    {
      enabled: !!user?.email && !!localStorage.getItem('token'),
      retry: false, // Disable automatic retries
    }
  );

  return { currentUser, isLoading, isError, error, refetch };
};

export default useUser;
