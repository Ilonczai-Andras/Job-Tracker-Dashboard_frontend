import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

const useDeleteReminder = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = await getAccessTokenSilently();
      const baseUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${baseUrl}/api/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete reminder');
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};

export default useDeleteReminder;
