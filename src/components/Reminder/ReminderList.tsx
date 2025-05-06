import { useState, useEffect } from "react";
import { useReminders } from "../../hooks/Reminder/useGetReminders";
import useDeleteReminder from "../../hooks/Reminder/useDeleteReminder";
import ReminderModal from "../Modal/Reminder/ReminderModal";
import { Reminder } from "../../hooks/Reminder/types";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "../Skeleton"; // Import the Skeleton component

interface Props {
  search?: string;
  filter?: "all" | "upcoming" | "sent" | "unsent";
}

const ReminderList = ({ search = "", filter = "all" }: Props) => {
  const { data: reminders = [], isLoading, error } = useReminders();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const deleteReminder = useDeleteReminder();

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {/* Skeleton for no reminders message */}
        <Skeleton width={200} height={20} className="mb-4" />
        {/* Skeleton for individual reminder items */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="relative border rounded p-3 sm:p-4 mb-2 bg-gray-900 animate-pulse flex items-center gap-3"
          >
            <div className="absolute top-2 right-2">
              <Skeleton width={24} height={24} className="rounded-full" />
            </div>
            <div className="absolute top-2 right-10">
              <Skeleton width={20} height={20} />
            </div>
            <div className="flex-1">
              {" "}
              {/* Take up remaining space */}
              <Skeleton width="80%" height={24} className="mb-1 sm:mb-2" />
              <Skeleton width="60%" height={16} className="mb-0.5 sm:mb-1" />
              <Skeleton width="70%" height={16} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-red-600 py-4">
        ⚠ An error occurred when loading data. Please try again later.
      </div>
    );

  const filtered = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.title.toLowerCase().includes(search.toLowerCase()) ||
      reminder.description?.toLowerCase().includes(search.toLowerCase());

    const now = new Date();
    const remindAt = new Date(reminder.remind_at);
    const isUpcoming =
      remindAt >= now &&
      remindAt <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const matchesStatus =
      filter === "sent"
        ? reminder.is_sent
        : filter === "unsent"
        ? !reminder.is_sent
        : true;

    if (filter === "upcoming") {
      return matchesSearch && isUpcoming && matchesStatus;
    }

    return matchesSearch && matchesStatus;
  });

  const openModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setModalOpen(true);
  };

  return (
    <div>
      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm mb-4">
          No matching reminders found.
        </p>
      )}

      {filtered.map((reminder) => (
        <div
          key={reminder.id}
          className="relative border rounded p-3 sm:p-4 mb-2 bg-gray-900 flex items-center gap-3"
        >
          <span
            className="absolute top-2 right-2"
            title={reminder.is_sent ? "Sent" : "Unsent"}
          >
            {reminder.is_sent ? (
              <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            ) : (
              <XMarkIcon className="w-5 h-5 sm:w-7 sm:h-7 text-red-500" />
            )}
          </span>

          <div className="absolute top-2 right-8 sm:right-10">
            {" "}
            {/* Adjust position for smaller screens */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === reminder.id ? null : reminder.id);
              }}
              className="text-white text-lg sm:text-xl font-bold hover:text-gray-300"
            >
              ⋮
            </button>
            {openMenuId === reminder.id && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-1 w-28 bg-white text-black rounded shadow z-10 text-sm sm:text-base"
              >
                <button
                  onClick={() => {
                    deleteReminder.mutate(reminder.id);
                    setOpenMenuId(null);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-red-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    openModal(reminder);
                    setOpenMenuId(null);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-green-100"
                >
                  Update
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 for text overflow handling */}
            <h3 className="text-lg font-semibold text-white truncate">
              {" "}
              {/* Added truncate for long titles */}
              {reminder.title}
            </h3>
            <div
              className="text-white text-sm overflow-hidden"
              style={{ maxHeight: "60px" }}
              dangerouslySetInnerHTML={{ __html: reminder.description || "" }}
            />
            <p className="text-xs text-white mt-1 sm:text-sm">
              {" "}
              {/* Smaller font on mobile */}
              Reminder date: {new Date(reminder.remind_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      <ReminderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reminder={selectedReminder}
      />
    </div>
  );
};

export default ReminderList;
