import { Reminder} from "./types";
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

const fetchReminders = async (token: string): Promise<Reminder[]> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(`${baseUrl}/api/reminders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reminders");
  }

  return res.json();
};

export const useReminders = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await fetchReminders(token);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
