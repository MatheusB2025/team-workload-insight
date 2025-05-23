
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";
import { exportSprintToPDF } from "@/utils/pdfExport";

interface ArchivedSprintItemProps {
  sprint: Sprint;
  onRestore: (id: number) => void;
}

export const ArchivedSprintItem: React.FC<ArchivedSprintItemProps> = ({ sprint, onRestore }) => {
  const formatSprintDate = (dateString: string) => {
    return format(parseISO(dateString), "dd/MM", { locale: ptBR });
  };

  return (
    <div className="flex justify-between items-center p-2 bg-white rounded border">
      <div>
        <span className="font-medium text-sm">{sprint.name}</span>
        <span className="text-xs text-gray-500 ml-2">
          ({formatSprintDate(sprint.startDate)} - {formatSprintDate(sprint.endDate)})
        </span>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => exportSprintToPDF(sprint)}
        >
          <FileText className="h-3.5 w-3.5 mr-1" />
          PDF
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onRestore(sprint.id)}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Restaurar
        </Button>
      </div>
    </div>
  );
};
