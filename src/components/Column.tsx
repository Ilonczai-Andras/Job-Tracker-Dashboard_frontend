import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Application } from "../hooks/Application/types";
import { SortableCard } from "./Card/SortableCard";
import "../styles/columnScrollbar.css";

interface ColumnProps {
  id: string;
  title: string;
  cards: Application[];
}

export const Column = ({ id, title, cards }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-[#fefefe] rounded-2xl shadow-md flex flex-col gap-2 sm:gap-3 h-full max-h-[calc(100vh-6rem)] overflow-y-auto w-[calc(100vw-2rem)] sm:w-auto min-w-[280px]"
    >
      <h3 className="text-[1rem] sm:text-[1.2rem] font-semibold bg-gray-900 text-white text-center sticky top-0 rounded z-8 py-2">
        {title}
      </h3>

      <SortableContext
        items={cards.map((c) => c.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1 sm:gap-2 p-2 sm:p-3">
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
