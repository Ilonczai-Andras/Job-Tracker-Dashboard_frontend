import { useEffect, useState } from "react";
import { useProfiles } from "../hooks/Profile/useGetProfile";
import useUpdateProfile from "../hooks/Profile/useUpdateProfile";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Skeleton"; // Import the Skeleton component

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
          toast.success("Profile successfully updated!");
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#f5f8ff] flex justify-center items-center py-8">
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Picture skeleton */}
          <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center">
            <div className="w-48 h-56 sm:w-64 sm:h-72 bg-gray-200 rounded-xl border-2 border-black flex justify-center items-center animate-pulse">
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gray-300 shadow" />
            </div>
          </div>

          {/* Form skeleton */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Picture link
              </label>
              <div>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Skeleton width={80} height={40} />
              <Skeleton width={80} height={40} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#f5f8ff] flex justify-center items-center py-8">
        <div className="text-center text-red-600 py-4">
          ⚠ An error occurred when loading data. Please try again later.
        </div>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f8ff] flex justify-center items-center py-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Picture section */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center">
          <div className="w-48 h-56 sm:w-64 sm:h-72 bg-gray-200 rounded-xl border-2 border-black flex justify-center items-center">
            <img
              src={picture || "/default-avatar.png"}
              alt={name}
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow"
            />
          </div>
        </div>

        {/* Form section */}
        <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-4">
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
          </div>

          <div className="space-y-2 sm:space-y-4">
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
          </div>

          <div className="space-y-2 sm:space-y-4">
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

          <div className="flex flex-wrap justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button
              className="border-2 border-black px-4 py-2 sm:px-6 sm:py-3 rounded shadow-md"
              onClick={handleSubmit}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving..." : "Save"}
            </button>
            <button
              className="border-2 border-black px-4 py-2 sm:px-6 sm:py-3 rounded shadow-md"
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
