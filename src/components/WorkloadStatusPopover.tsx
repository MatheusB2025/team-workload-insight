
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/context/TeamContext";

interface WorkloadStatusPopoverProps {
  memberId: string;
  children: React.ReactNode;
}

export const WorkloadStatusPopover: React.FC<WorkloadStatusPopoverProps> = ({ memberId, children }) => {
  const { calculateMemberWorkload, getWorkloadStatus } = useTeam();
  
  const workload = calculateMemberWorkload(memberId);
  const status = getWorkloadStatus(workload);
  
  const getStatusDescription = () => {
    switch (status) {
      case "Inadequada":
        return "Carga de trabalho baixa. É necessário rever as atividades distribuídas para melhor aproveitamento.";
      case "Adequada":
        return "Carga de trabalho ideal. O colaborador está com boa distribuição de tarefas.";
      case "Elevada":
        return "Carga de trabalho muito alta. É necessário rever as atividades distribuídas para evitar sobrecarga.";
      default:
        return "";
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case "Inadequada":
        return "bg-workload-inadequate";
      case "Adequada":
        return "bg-workload-adequate";
      case "Elevada":
        return "bg-workload-high";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
            <h4 className="font-semibold text-sm">
              Carga de trabalho: <span className="font-normal">{status}</span>
            </h4>
          </div>
          <p className="text-sm">{getStatusDescription()}</p>
          <div className="pt-2">
            <div className="bg-gray-200 h-2 rounded-full">
              <div 
                className={`h-2 rounded-full ${getStatusColor()}`}
                style={{ width: `${workload}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0%</span>
              <span className="text-xs text-gray-500">100%</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
