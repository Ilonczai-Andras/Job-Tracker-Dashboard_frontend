import { useEffect, useState } from "react";
import { useProfiles } from "../hooks/Profile/useGetProfile";
import { Spinner } from "./Spinner";
import useUpdateProfile from "../hooks/Profile/useUpdateProfile";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const { data: profile, isLoading, error } = useProfiles();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
      setPicture(profile.picture ?? "");
    }
  }, [profile]);

  const handleSubmit = () => {
    if (!profile) return;

    const isUnchanged =
      name === profile?.name &&
      email === profile?.email &&
      picture === profile?.picture;

    if (isUnchanged) {
      toast.success("Nothing changed to update.");
      return;
    }

    updateProfile.mutate(
      {
        id: profile.id,
        data: {
          name,
          email,
          picture,
        },
      },
      {
        onSuccess: () => {
          toast.success("Reminder successfully updated!");
        },
        onError: () => {
          toast.error("Failed to update reminder");
        },
      }
    );
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-600 py-4">
        ⚠ An error occurred when loading data. Please try again later.
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f8ff] flex justify-center items-center py-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Picture section */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center">
          <div className="w-64 h-72 bg-gray-200 rounded-xl border-2 border-black flex justify-center items-center">
            <img
              src={picture || "/default-avatar.png"}
              alt={name}
              className="w-48 h-48 rounded-full object-cover shadow"
            />
          </div>
        </div>

        {/* Form section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Picture link
            </label>
            <div>
              <input
                type="text"
                placeholder="Picture URL"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-4 pt-6">
            <button
              className="border-2 border-black px-6 py-3 rounded shadow-md"
              onClick={handleSubmit}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving..." : "Save"}
            </button>
            <button
              className="border-2 border-black px-6 py-3 rounded shadow-md"
              onClick={() => {
                setName(profile?.name ?? "");
                setEmail(profile?.email ?? "");
                setPicture(profile?.picture ?? "");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
