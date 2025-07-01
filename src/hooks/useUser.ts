"use client"
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { useAuth } from "@clerk/nextjs";

const fetchCurrentUser = async (token: string | null) => {
  if (!token) throw new Error("No authentication token found");
  const { data } = await axios.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCurrentUser = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = await getToken();
      return fetchCurrentUser(token);
    },
    enabled: typeof window !== "undefined",
  });
};
