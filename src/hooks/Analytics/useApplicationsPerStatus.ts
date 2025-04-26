import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

const fetchAnalytics = async (token: string)=> {
  const baseUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(`${baseUrl}/api/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
};

export const useAnalytics = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await fetchAnalytics(token);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};