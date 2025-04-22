import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Application } from "../hooks/Application/types";
import { SortableCard } from "./Card/SortableCard";

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
      className="bg-[#fefefe] rounded-2xl p-4 shadow-md flex flex-col gap-3 h-full max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <h3 className="text-[1.2rem] font-semibold mb-2 text-gray-700 sticky top-0 bg-[#fefefe] z-10 pb-2">
        {title}
      </h3>

      <SortableContext
        items={cards.map((c) => c.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
