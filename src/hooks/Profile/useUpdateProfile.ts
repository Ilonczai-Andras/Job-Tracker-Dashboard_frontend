import { ProfileUpdateInput } from "./types";
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateProfile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: ProfileUpdateInput) => {
      const token = await getAccessTokenSilently();
      const baseUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(`${baseUrl}/api/profiles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export default useUpdateProfile;
