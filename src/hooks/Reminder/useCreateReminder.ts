import {ReminderCreateInput} from "./types";
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReminder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReminderCreateInput) => {
      const token = await getAccessTokenSilently();
      const baseUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${baseUrl}/api/reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create reminder");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};

export default useCreateReminder;
