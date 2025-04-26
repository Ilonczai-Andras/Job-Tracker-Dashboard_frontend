import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfiles } from "../hooks/Profile/useGetProfile";

const LOCAL_STORAGE_KEY = "view-mode";

const UserMenu = () => {
  const { isAuthenticated } = useAuth0();
  const { data: user, isLoading, error } = useProfiles();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "board";
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("reminders")) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "reminders");
      setViewMode("reminders");
    } else if (path.includes("board")) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "board");
      setViewMode("board");
    } else if (path.includes("profile")) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "profile");
      setViewMode("profile");
    }
    else if (path.includes("analytics")) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "analytics");
      setViewMode("analytics");
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 px-4 flex items-center gap-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 transition-colors"
      >
        {isAuthenticated && user ? (
          <>
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span>👤</span>
            )}
            <span>{user.name}</span>
            <span>▼</span>
          </>
        ) : (
          <>
            <span>Guest</span>
            <span>▼</span>
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <div className="flex flex-col p-2 space-y-2">
            {isAuthenticated && (
              <>
                {location.pathname !== "/reminders" && (
                  <Link
                    to="/reminders"
                    className="text-left hover:bg-gray-100 p-2 rounded transition-colors text-black"
                    onClick={() => setOpen(false)}
                  >
                    Reminders
                  </Link>
                )}

                {location.pathname !== "/board" && (
                  <Link
                    to="/board"
                    className="text-left hover:bg-gray-100 p-2 rounded transition-colors text-black"
                    onClick={() => setOpen(false)}
                  >
                    Kanban board
                  </Link>
                )}

                {location.pathname !== "/profile" && (
                  <Link
                    to="/profile"
                    className="text-left hover:bg-gray-100 p-2 rounded transition-colors text-black"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                )}
                {location.pathname !== "/analytics" && (
                  <Link
                    to="/analytics"
                    className="text-left hover:bg-gray-100 p-2 rounded transition-colors text-black"
                    onClick={() => setOpen(false)}
                  >
                    Analytics
                  </Link>
                )}
              </>
            )}

            <hr />

            <LoginButton />
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
