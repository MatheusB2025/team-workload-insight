
import { Task } from "./types";
import { WorkloadStatus } from "@/types";

export const calculateWorkload = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  
  // Count total task-days
  const totalTaskDays = tasks.reduce((sum, task) => sum + task.days.length, 0);
  
  // Calculate workload percentage based on a theoretical max
  // Assuming 5 tasks with all 5 days would be 100%
  const maxPossibleTaskDays = 25; // 5 tasks × 5 days
  return Math.round((totalTaskDays / maxPossibleTaskDays) * 100);
};

export const getWorkloadStatus = (percentage: number): WorkloadStatus => {
  if (percentage <= 50) return "Inadequada";
  if (percentage <= 80) return "Adequada";
  return "Elevada";
};

export const getWorkloadColor = (status: WorkloadStatus): string => {
  switch (status) {
    case "Inadequada":
      return "workload-inadequate";
    case "Adequada":
      return "workload-adequate";
    case "Elevada":
      return "workload-high";
    default:
      return "";
  }
};
