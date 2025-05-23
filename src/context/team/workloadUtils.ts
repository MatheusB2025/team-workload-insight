
import { Task } from "./types";
import { WorkloadStatus } from "@/types";

export const calculateWorkload = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  
  // Simply use the number of tasks rather than task days
  const numberOfTasks = tasks.length;
  
  // Calculate workload percentage based on number of tasks
  // Assuming 5 tasks would be 100% workload
  const maxPossibleTasks = 5;
  return Math.round((numberOfTasks / maxPossibleTasks) * 100);
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
