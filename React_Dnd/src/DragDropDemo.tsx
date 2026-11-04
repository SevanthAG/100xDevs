
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Issue = {
  id: number;
  title: string;
};

type Column = {
  id: string;
  title: string;
  issues: Issue[];
};

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "Todo",
    issues: [
      { id: 1, title: "Create Login UI" },
      { id: 2, title: "Create Signup API" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    issues: [
      { id: 3, title: "Implement WebSocket" },
    ],
  },
  {
    id: "done",
    title: "Done",
    issues: [
      { id: 4, title: "Setup Database" },
    ],
  },
];

const ItemTypes = {
  ISSUE: "issue",
};

function IssueCard({ issue }: { issue: Issue }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ISSUE,
    item: { id: issue.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [issue.id]);

  return (
    <div
      ref={drag}
      style={{
        padding: "12px",
        marginBottom: "10px",
        background: "#ffffff",
        color: "#222",
        borderRadius: "8px",
        cursor: "grab",
        opacity: isDragging ? 0.4 : 1,
        border: "1px solid #ddd",
      }}
    >
      {issue.title}
    </div>
  );
}

function ColumnView({
  column,
  moveIssue,
}: {
  column: Column;
  moveIssue: (issueId: number, targetId: string) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ISSUE,
    drop: (item: { id: number }) => {
      moveIssue(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [column.id, moveIssue]);

  return (
    <div
      ref={drop}
      style={{
        background: isOver ? "#e0f2fe" : "#f1f5f9",
        padding: "16px",
        borderRadius: "10px",
        minHeight: "250px",
      }}
    >
      <h3>{column.title}</h3>

      {column.issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}

export default function DragDropDemo() {
  const [columns, setColumns] = useState(initialColumns);

  const moveIssue = (issueId: number, targetId: string) => {
    setColumns((prev) => {
      const sourceColumn = prev.find((column) =>
        column.issues.some((issue) => issue.id === issueId)
      );

      const targetColumn = prev.find(
        (column) => column.id === targetId
      );

      if (!sourceColumn || !targetColumn) return prev;

      if (sourceColumn.id === targetId) return prev;

      const issue = sourceColumn.issues.find(
        (issue) => issue.id === issueId
      )!;

      return prev.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            issues: column.issues.filter(
              (issue) => issue.id !== issueId
            ),
          };
        }

        if (column.id === targetId) {
          return {
            ...column,
            issues: [...column.issues, issue],
          };
        }

        return column;
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          padding: "20px",
        }}
      >
        {columns.map((column) => (
          <ColumnView
            key={column.id}
            column={column}
            moveIssue={moveIssue}
          />
        ))}
      </div>
    </DndProvider>
  );
}
