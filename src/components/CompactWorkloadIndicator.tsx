
import React from "react";
import { Progress } from "@/components/ui/progress";
import { useTeam } from "@/context/TeamContext";

interface CompactWorkloadIndicatorProps {
  workload: number;
}

export const CompactWorkloadIndicator: React.FC<CompactWorkloadIndicatorProps> = ({ workload }) => {
  const { getWorkloadStatus, getWorkloadColor } = useTeam();
  const status = getWorkloadStatus(workload);
  const colorClass = getWorkloadColor(status);

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center h-6 w-10 rounded-sm bg-gray-100 text-xs font-medium">
        {workload}%
      </div>
    </div>
  );
};
