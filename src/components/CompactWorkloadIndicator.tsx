
import React from "react";
import { useTeam } from "@/context/TeamContext";

interface CompactWorkloadIndicatorProps {
  workload: number;
}

export const CompactWorkloadIndicator: React.FC<CompactWorkloadIndicatorProps> = ({ workload }) => {
  const { getWorkloadStatus, getWorkloadColor } = useTeam();
  const status = getWorkloadStatus(workload);
  const colorClass = getWorkloadColor(status);
  
  // Calculate the circle's circumference and the filled portion
  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = (100 - workload) / 100 * circumference;

  return (
    <div className="text-center flex items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        {/* SVG donut chart */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="#f0f0f0"
          />
          
          {/* Progress circle */}
          <circle
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="#9b87f5" // Purple color
            strokeDasharray={circumference}
            strokeDashoffset={fillPercent}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Percentage text in the middle */}
        <div className="absolute text-xs font-medium">
          {workload}%
        </div>
      </div>
    </div>
  );
};
