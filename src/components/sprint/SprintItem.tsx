
import React from "react";
import { ListPlus, Edit, Archive, Trash2, MoreVertical, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sprint } from "@/context/team/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { exportSprintToPDF, printSprint } from "@/utils/pdfExport";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface SprintItemProps {
  sprint: Sprint;
  archived?: boolean;
  onEdit: (sprint: Sprint) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

export const SprintItem: React.FC<SprintItemProps> = ({
  sprint,
  archived = false,
  onEdit,
  onArchive,
  onRestore,
  onDelete
}) => {
  const formatSprintDates = (startDate: string, endDate: string) => {
    const start = format(parseISO(startDate), "dd/MM", { locale: ptBR });
    const end = format(parseISO(endDate), "dd/MM", { locale: ptBR });
    return `${start} - ${end}`;
  };
  
  return (
    <div className="flex items-center justify-between py-1 px-1 rounded hover:bg-gray-100 group">
      <div className="flex items-center">
        <ListPlus className="h-3 w-3 mr-2 text-gray-500" />
        <div>
          <div className="font-medium text-xs">{sprint.name}</div>
          <div className="text-xs text-gray-500">
            {formatSprintDates(sprint.startDate, sprint.endDate)}
          </div>
        </div>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit(sprint)}>
              <Edit className="h-3.5 w-3.5 mr-2" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => archived ? onRestore(sprint.id) : onArchive(sprint.id)}>
              <Archive className="h-3.5 w-3.5 mr-2" />
              <span>{archived ? "Restaurar" : "Arquivar"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportSprintToPDF(sprint)}>
              <FileText className="h-3.5 w-3.5 mr-2" />
              <span>Exportar PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => printSprint(sprint)}>
              <Printer className="h-3.5 w-3.5 mr-2" />
              <span>Imprimir</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(sprint.id)}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" />
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

