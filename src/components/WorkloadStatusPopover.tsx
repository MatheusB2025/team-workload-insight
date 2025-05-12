
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useTeam } from "@/context/TeamContext";

interface WorkloadStatusPopoverProps {
  memberId: string;
  children: React.ReactNode;
}

export const WorkloadStatusPopover: React.FC<WorkloadStatusPopoverProps> = ({ memberId, children }) => {
  const { calculateMemberWorkload, getWorkloadStatus, getWorkloadColor } = useTeam();
  
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
    <div className="w-full">
      {children}
    </div>
  );
};
