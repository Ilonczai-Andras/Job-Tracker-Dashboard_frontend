import { ReminderUpdateInput } from "./types";
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateReminder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: ReminderUpdateInput) => {
      const token = await getAccessTokenSilently();
      const baseUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(
        `${baseUrl}/api/reminders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update reminder");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
};

export default useUpdateReminder;
