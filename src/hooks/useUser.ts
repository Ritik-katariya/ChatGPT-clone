"use client"
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

const fetchUser = async () => {
  const { data } = await axios.get('/users');
  return data;
};

// This hook requires a QueryClientProvider to be set higher in the React tree.
// If you see "No QueryClient set", ensure your app is wrapped with QueryClientProvider in your layout or _app file.

export const useUser = () => {
  if (typeof window === "undefined") {
    // Prevent running react-query on the server (e.g., in Next.js SSR/SSG)
    return { data: null, isLoading: false, isError: false };
  }
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};
