
import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";
import { ArchivedSprintItem } from "../sprint/ArchivedSprintItem";

interface ArchivedSprintsListProps {
  archivedSprints: Sprint[];
  unarchiveSprint: (sprintId: number) => void;
  showArchivedSprints: boolean;
}

export const ArchivedSprintsList: React.FC<ArchivedSprintsListProps> = ({
  archivedSprints,
  unarchiveSprint,
  showArchivedSprints
}) => {
  if (!showArchivedSprints || archivedSprints.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-md">
      <h3 className="font-medium mb-3 text-sm">Sprints Arquivadas</h3>
      <div className="space-y-2">
        {archivedSprints.map(sprint => (
          <ArchivedSprintItem 
            key={sprint.id}
            sprint={sprint}
            onRestore={unarchiveSprint}
          />
        ))}
      </div>
    </div>
  );
};
