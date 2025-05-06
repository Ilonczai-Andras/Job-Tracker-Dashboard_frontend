import { useAuth0 } from "@auth0/auth0-react";
import ApplicationModal from "./Modal/Application/ApplicationModal";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";

export const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const isOnBoard = location.pathname.includes("/board");

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
        <Skeleton width={200} height={20} className="rounded-md" />
        <div className="flex items-center gap-4">
          {isAuthenticated && isOnBoard && (
            <Skeleton width={150} height={40} className="rounded-lg" />
          )}
          <Skeleton width={50} height={50} className="rounded-full" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
      <h2 className="text-[1.3rem]">Job Tracker Dashboard</h2>

      <div className="flex items-center gap-4">
        {isAuthenticated && isOnBoard && (
          <button
            onClick={() => setModalOpen(true)}
            className="h-10 px-4 rounded-lg bg-white text-gray-800 shadow flex items-center hover:bg-gray-100 transition-colors"
          >
            + New Application
          </button>
        )}

        <UserMenu />
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </header>
  );
};
