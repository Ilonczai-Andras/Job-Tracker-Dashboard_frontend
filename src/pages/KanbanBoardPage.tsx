import { useAuth0 } from "@auth0/auth0-react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { Column } from "../components/Column";
import { Card } from "../components/Card/Card";
import { useApplications } from "../hooks/Application/useGetApplications";
import { Application } from "../hooks/Application/types";
import useUpdateApplication from "../hooks/Application/useUpdateApplication";
import { Spinner } from "../components/Spinner";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type ColumnId = "todo" | "inprogress" | "interview" | "offer" | "rejected";

type BoardState = {
  [key in ColumnId]: Application[];
};

const emptyBoard: BoardState = {
  todo: [],
  inprogress: [],
  interview: [],
  offer: [],
  rejected: [],
};

export const KanbanBoard = () => {
  const { isAuthenticated } = useAuth0();
  const { data: applications = [], isLoading, error } = useApplications();
  const updateApplication = useUpdateApplication();

  const [board, setBoard] = useState<BoardState>(emptyBoard);
  const [activeCard, setActiveCard] = useState<Application | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!applications || applications.length === 0) return;

    const grouped: BoardState = {
      todo: [],
      inprogress: [],
      interview: [],
      offer: [],
      rejected: [],
    };

    applications.forEach((app) => {
      if (grouped[app.status]) {
        grouped[app.status as ColumnId].push(app);
      }
    });

    setBoard(grouped);
  }, [applications]);

  if (!isAuthenticated) return <p>Please log in to see your board.</p>;
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-600 py-4">
        ⚠ An error occurred when loading data. Please try again later.
      </div>
    );

  const handleDragStart = (event: any) => {
    const activeId = event.active.id;
    const found = Object.values(board)
      .flat()
      .find((c) => c.id.toString() === activeId);
    if (found) setActiveCard(found);
  };

  // Helper to find the column of a given card by ID
  const findColumnByCardId = (
    board: BoardState,
    cardId: string
  ): ColumnId | undefined => {
    return (Object.keys(board) as ColumnId[]).find((columnId) =>
      board[columnId].some((card) => card.id.toString() === cardId)
    );
  };

  // Helper to move card within the same column (reordering)
  const moveCardWithinColumn = (
    column: Application[],
    fromIndex: number,
    toIndex: number
  ): Application[] => {
    return arrayMove(column, fromIndex, toIndex);
  };

  // Helper to move card between two columns
  const moveCardBetweenColumns = (
    board: BoardState,
    source: ColumnId,
    destination: ColumnId,
    card: Application
  ): BoardState => {
    return {
      ...board,
      [source]: board[source].filter((c) => c.id !== card.id),
      [destination]: [...board[destination], card],
    };
  };

  // The main drag end handler
  const handleDragEnd = async (event: DragEndEvent) => {
    if (!isAuthenticated) {
      console.warn("User is not logged in, skipping update.");
      return;
    }
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const sourceColumn = findColumnByCardId(board, activeId);
    if (!sourceColumn) return;

    let destinationColumn: ColumnId | undefined;

    if ((Object.keys(board) as ColumnId[]).includes(overId as ColumnId)) {
      destinationColumn = overId as ColumnId;
    } else {
      destinationColumn = findColumnByCardId(board, overId);
    }

    if (!destinationColumn) return;

    // 🟣 Case 1 - Reordering in the same column
    if (sourceColumn === destinationColumn) {
      const oldIndex = board[sourceColumn].findIndex(
        (c) => c.id.toString() === activeId
      );
      const newIndex = board[destinationColumn].findIndex(
        (c) => c.id.toString() === overId
      );

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setBoard((prev) => ({
          ...prev,
          [sourceColumn]: moveCardWithinColumn(
            prev[sourceColumn],
            oldIndex,
            newIndex
          ),
        }));
      }
      return;
    }

    // 🟣 Case 2 - Moving to another column
    const cardToMove = board[sourceColumn].find(
      (card) => card.id.toString() === activeId
    );
    if (!cardToMove) return;

    // ✅ Update the card status before moving
    const updatedCard: Application = {
      ...cardToMove,
      status: destinationColumn,
    };

    // ✅ Optimistic UI update
    setBoard((prev) =>
      moveCardBetweenColumns(
        prev,
        sourceColumn,
        destinationColumn!,
        updatedCard
      )
    );

    // ✅ Save to backend
    try {
      const { id, ...rest } = updatedCard;

      await updateApplication.mutateAsync({
        id,
        data: rest,
      });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success("Application succesfully updated!");
    } catch (error) {
      console.error("Failed to update application", error);
      toast.error("Failed to update application");
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveCard(null)}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4 h-[calc(100vh-73px)] bg-blue-100">
        <Column id="todo" title="To Do" cards={board.todo} />
        <Column id="inprogress" title="In Progress" cards={board.inprogress} />
        <Column id="interview" title="Interview" cards={board.interview} />
        <Column id="offer" title="Offer" cards={board.offer} />
        <Column id="rejected" title="Rejected" cards={board.rejected} />
      </div>

      <DragOverlay>{activeCard && <Card {...activeCard} />}</DragOverlay>
    </DndContext>
  );
};
