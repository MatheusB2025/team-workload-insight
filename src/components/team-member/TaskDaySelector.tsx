
import React from "react";
import { Day } from "@/types";
import { TaskDay } from "./TaskDay";

interface TaskDaySelectorProps {
  selectedDays: Day[];
  onToggleDay: (day: Day) => void;
}

export const TaskDaySelector: React.FC<TaskDaySelectorProps> = ({ selectedDays, onToggleDay }) => {
  const availableDays: Day[] = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  
  return (
    <div className="flex gap-1">
      {availableDays.map((day) => (
        <TaskDay
          key={day}
          day={day}
          isSelected={selectedDays.includes(day)}
          onClick={() => onToggleDay(day)}
        />
      ))}
    </div>
  );
};
