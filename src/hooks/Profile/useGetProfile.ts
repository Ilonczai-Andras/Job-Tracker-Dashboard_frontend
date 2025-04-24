import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "./types";

const fetchProfile = async (token: string): Promise<Profile> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(`${baseUrl}/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
};

export const useProfiles = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await fetchProfile(token);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
