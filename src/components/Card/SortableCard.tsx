import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";
import { Application } from "../../hooks/Application/types";

interface Props {
  card: Application;
}

export const SortableCard = ({ card }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id.toString(), // DnD always needs string ids
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card {...card} />
    </div>
  );
};
