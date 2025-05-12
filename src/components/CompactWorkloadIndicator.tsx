
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
      <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1">
        <span className="text-xs font-medium">{workload}%</span>
      </div>
    </div>
  );
};
