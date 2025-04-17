import { useAuth0 } from "@auth0/auth0-react";
import ApplicationModal from "./Modal/Application/ApplicationModal";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { isAuthenticated } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const isOnBoard = location.pathname.includes("/board");

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
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
