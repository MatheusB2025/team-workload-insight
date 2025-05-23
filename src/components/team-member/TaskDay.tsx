
import React from "react";
import { Day } from "@/types";

interface TaskDayProps {
  day: Day;
  isSelected: boolean;
  onClick: () => void;
}

export const TaskDay: React.FC<TaskDayProps> = ({ day, isSelected, onClick }) => {
  const dayColors = {
    Seg: "bg-purple-500 text-white",
    Ter: "bg-purple-500 text-white",
    Qua: "bg-purple-500 text-white",
    Qui: "bg-purple-500 text-white",
    Sex: "bg-purple-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`h-5 w-8 text-[10px] font-medium ${
        isSelected ? dayColors[day] : "bg-gray-100 text-gray-600"
      } rounded`}
    >
      {day}
    </button>
  );
};
