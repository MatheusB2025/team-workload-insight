
import { Day, User, UserRole, WorkloadStatus } from "@/types";

export interface TeamContextProps {
  currentTeam: Team;
  isLoading: boolean;
  currentWeek: string;
  setCurrentWeek: (week: string) => void;
  addMember: (name: string, image?: string) => void;
  removeMember: (id: string) => void;
  addTask: (memberId: string, taskName: string) => void;
  removeTask: (memberId: string, taskId: string) => void;
  editTask: (memberId: string, taskId: string, newTaskName: string) => void;
  transferTask: (taskId: string, fromMemberId: string, toMemberId: string) => void;
  toggleTaskDay: (memberId: string, taskId: string, day: Day) => void;
  calculateMemberWorkload: (memberId: string) => number;
  getWorkloadStatus: (percentage: number) => WorkloadStatus;
  getWorkloadColor: (status: WorkloadStatus) => string;
  users: User[];
  addUser: (name: string, email: string, role: UserRole) => void;
  removeUser: (id: string) => void;
  editUser: (id: string, name: string, email: string, role: UserRole) => void;
  sprints: Sprint[];
  sprintFolders: SprintFolder[];
  addSprint: (startDate: Date) => void;
  toggleSprintFolder: (folderId: string) => void;
  archiveSprint: (sprintId: number) => void;
  unarchiveSprint: (sprintId: number) => void;
  moveSprint: (sprintId: number, folderId: string) => void;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  image?: string;
  tasks: Task[];
  workload: number;
}

export interface Task {
  id: string;
  name: string;
  assignedTo: string;
  days: Day[];
}

export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  archived?: boolean;
  folderId?: string;
}

export interface SprintFolder {
  id: string;
  name: string;
  isOpen: boolean;
}
