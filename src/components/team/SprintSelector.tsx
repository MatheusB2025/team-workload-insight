
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Archive } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";

interface SprintSelectorProps {
  availableSprints: Sprint[];
  selectedSprintId: number | null;
  setSelectedSprintId: (id: number) => void;
  showArchivedSprints: boolean;
  setShowArchivedSprints: (show: boolean) => void;
  archiveSprint: (sprintId: number) => void;
  firstWeekSprint?: Sprint | undefined;
}

export const SprintSelector: React.FC<SprintSelectorProps> = ({
  availableSprints,
  selectedSprintId,
  setSelectedSprintId,
  showArchivedSprints,
  setShowArchivedSprints,
  archiveSprint,
  firstWeekSprint
}) => {
  // Format sprint dates for display
  const formatSprintDate = (dateString: string) => {
    return format(parseISO(dateString), "dd/MM", { locale: ptBR });
  };

  return (
    <div className="flex justify-between items-center mb-6 border-b pb-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-600" />
        <Select 
          defaultValue={firstWeekSprint ? String(firstWeekSprint.id) : undefined}
          onValueChange={(value) => setSelectedSprintId(Number(value))}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Selecionar sprint" />
          </SelectTrigger>
          <SelectContent>
            {availableSprints.map(sprint => (
              <SelectItem key={sprint.id} value={String(sprint.id)}>
                {sprint.name} ({formatSprintDate(sprint.startDate)} - {formatSprintDate(sprint.endDate)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowArchivedSprints(!showArchivedSprints)}
        >
          <Archive className="h-4 w-4 mr-1" />
          Sprints Arquivadas
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => archiveSprint(selectedSprintId || (firstWeekSprint?.id || 0))}
        >
          <Archive className="h-4 w-4 mr-1" />
          Arquivar Sprint
        </Button>
      </div>
    </div>
  );
};
