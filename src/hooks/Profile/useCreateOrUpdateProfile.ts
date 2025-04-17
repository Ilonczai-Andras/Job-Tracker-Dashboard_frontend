import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { ProfileCreateInput } from "./types";

const useCreateOrUpdateProfile = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      const token = await getAccessTokenSilently();

      const profileData: ProfileCreateInput = {
        auth0_id: user?.sub || "",
        name: user?.name || "",
        email: user?.email || "",
        picture: user?.picture || "",
      };

      const baseUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${baseUrl}/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        throw new Error("Failed to create or update profile");
      }
    },
  });
};

export default useCreateOrUpdateProfile;
