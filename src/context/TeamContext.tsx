import React, { createContext, useState, useContext, ReactNode } from "react";
import { Team, TeamMember, Task, Day, User, UserRole, WorkloadStatus, Sprint, SprintFolder } from "@/types";
import { toast } from "sonner";
import { addWeeks, format, parseISO, endOfWeek, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TeamContextProps {
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

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState("Semana Atual");
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Admin", email: "admin@example.com", role: "Administrador" },
    { id: "2", name: "Viewer", email: "viewer@example.com", role: "Leitor" },
  ]);

  // Initial demo data
  const [currentTeam, setCurrentTeam] = useState<Team>({
    id: "team-1",
    name: "Equipe - CIT",
    members: [
      {
        id: "member-1",
        name: "Ana Silva",
        initials: "AS",
        tasks: [
          { id: "task-1", name: "Criar apresentação", assignedTo: "member-1", days: ["Seg", "Ter"] },
          { id: "task-2", name: "Revisar documentação", assignedTo: "member-1", days: ["Qua", "Qui"] },
          { id: "task-3", name: "Preparar relatório", assignedTo: "member-1", days: ["Seg", "Ter", "Qua"] },
        ],
        workload: 30,
      },
      {
        id: "member-2",
        name: "Carlos Oliveira",
        initials: "CO",
        tasks: [
          { id: "task-4", name: "Implementar nova feature", assignedTo: "member-2", days: ["Seg", "Ter"] },
          { id: "task-5", name: "Corrigir bugs do sistema", assignedTo: "member-2", days: ["Qua", "Qui"] },
          { id: "task-6", name: "Otimizar consultas", assignedTo: "member-2", days: ["Ter", "Qua"] },
          { id: "task-7", name: "Documentar API", assignedTo: "member-2", days: ["Qua", "Qui", "Sex"] },
        ],
        workload: 40,
      },
      {
        id: "member-3",
        name: "Mariana Costa",
        initials: "MC",
        tasks: [
          { id: "task-8", name: "Planejar campanha", assignedTo: "member-3", days: ["Seg", "Ter", "Qua", "Qui"] },
          { id: "task-9", name: "Analisar métricas", assignedTo: "member-3", days: ["Ter", "Qua"] },
          { id: "task-10", name: "Preparar reunião", assignedTo: "member-3", days: ["Qui", "Sex"] },
        ],
        workload: 30,
      },
    ],
  });

  // Sprint folders
  const [sprintFolders, setSprintFolders] = useState<SprintFolder[]>([
    { id: "folder-1", name: "Maio 2025", isOpen: true },
    { id: "folder-2", name: "Junho 2025", isOpen: false },
  ]);

  // Sprints
  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 1, name: "Semana 1", startDate: "2025-05-05", endDate: "2025-05-11", folderId: "folder-1" },
    { id: 2, name: "Semana 2", startDate: "2025-05-12", endDate: "2025-05-18", folderId: "folder-1" },
    { id: 3, name: "Semana 3", startDate: "2025-05-19", endDate: "2025-05-25", folderId: "folder-1" },
    { id: 4, name: "Semana 4", startDate: "2025-05-26", endDate: "2025-06-01", folderId: "folder-1" },
    { id: 5, name: "Semana 1", startDate: "2025-06-02", endDate: "2025-06-08", folderId: "folder-2" },
    { id: 6, name: "Semana 2", startDate: "2025-06-09", endDate: "2025-06-15", folderId: "folder-2" },
  ]);

  const toggleSprintFolder = (folderId: string) => {
    setSprintFolders(
      sprintFolders.map((folder) => 
        folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    );
  };

  const archiveSprint = (sprintId: number) => {
    setSprints(
      sprints.map((sprint) => 
        sprint.id === sprintId ? { ...sprint, archived: true } : sprint
      )
    );
    toast.success("Sprint arquivada com sucesso!");
  };

  const unarchiveSprint = (sprintId: number) => {
    setSprints(
      sprints.map((sprint) => 
        sprint.id === sprintId ? { ...sprint, archived: false } : sprint
      )
    );
    toast.success("Sprint restaurada com sucesso!");
  };

  const moveSprint = (sprintId: number, folderId: string) => {
    setSprints(
      sprints.map((sprint) => 
        sprint.id === sprintId ? { ...sprint, folderId } : sprint
      )
    );
  };

  const addSprint = (startDate: Date) => {
    // Format the month for folder name
    const monthYear = format(startDate, "MMMM yyyy", { locale: ptBR });
    const capitalizedMonthYear = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
    
    // Find or create folder for this month
    let folder = sprintFolders.find(f => f.name === capitalizedMonthYear);
    
    if (!folder) {
      folder = {
        id: `folder-${Date.now()}`,
        name: capitalizedMonthYear,
        isOpen: true
      };
      setSprintFolders([...sprintFolders, folder]);
    }
    
    // Calculate sprint week number for this month
    const sprintsInFolder = sprints.filter(s => s.folderId === folder!.id);
    const weekNumber = sprintsInFolder.length + 1;

    // Calculate end date (end of the week)
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
    
    // Create new sprint with empty tasks but same team members
    const newSprint: Sprint = {
      id: Date.now(),
      name: `Semana ${weekNumber}`,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      folderId: folder.id
    };
    
    setSprints([...sprints, newSprint]);
    toast.success("Nova sprint criada com sucesso!");
  };

  const addMember = (name: string, image?: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name,
      initials,
      image,
      tasks: [],
      workload: 0,
    };

    setCurrentTeam({
      ...currentTeam,
      members: [...currentTeam.members, newMember],
    });

    toast.success(`Colaborador ${name} adicionado com sucesso!`);
  };

  const removeMember = (id: string) => {
    const member = currentTeam.members.find((m) => m.id === id);
    if (!member) return;

    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.filter((member) => member.id !== id),
    });

    toast.success(`Colaborador ${member.name} removido com sucesso!`);
  };

  const addTask = (memberId: string, taskName: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: taskName,
      assignedTo: memberId,
      days: [],
    };

    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: [...member.tasks, newTask],
            workload: calculateWorkload([...member.tasks, newTask]),
          };
        }
        return member;
      }),
    });

    toast.success(`Tarefa adicionada com sucesso!`);
  };

  const removeTask = (memberId: string, taskId: string) => {
    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.map((member) => {
        if (member.id === memberId) {
          const updatedTasks = member.tasks.filter((task) => task.id !== taskId);
          return {
            ...member,
            tasks: updatedTasks,
            workload: calculateWorkload(updatedTasks),
          };
        }
        return member;
      }),
    });

    toast.success("Tarefa removida com sucesso!");
  };

  const editTask = (memberId: string, taskId: string, newTaskName: string) => {
    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: member.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, name: newTaskName };
              }
              return task;
            }),
          };
        }
        return member;
      }),
    });

    toast.success("Tarefa atualizada com sucesso!");
  };

  const transferTask = (taskId: string, fromMemberId: string, toMemberId: string) => {
    // Find the source member and task
    const sourceMember = currentTeam.members.find((m) => m.id === fromMemberId);
    if (!sourceMember) return;
    
    const taskToTransfer = sourceMember.tasks.find((t) => t.id === taskId);
    if (!taskToTransfer) return;

    // Update the task assignment
    const updatedTask = { ...taskToTransfer, assignedTo: toMemberId };

    // Remove task from source member and add to target member
    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.map((member) => {
        if (member.id === fromMemberId) {
          const updatedTasks = member.tasks.filter((task) => task.id !== taskId);
          return {
            ...member,
            tasks: updatedTasks,
            workload: calculateWorkload(updatedTasks),
          };
        }
        if (member.id === toMemberId) {
          const updatedTasks = [...member.tasks, updatedTask];
          return {
            ...member,
            tasks: updatedTasks,
            workload: calculateWorkload(updatedTasks),
          };
        }
        return member;
      }),
    });

    toast.success("Tarefa transferida com sucesso!");
  };

  const toggleTaskDay = (memberId: string, taskId: string, day: Day) => {
    setCurrentTeam({
      ...currentTeam,
      members: currentTeam.members.map((member) => {
        if (member.id === memberId) {
          const updatedTasks = member.tasks.map((task) => {
            if (task.id === taskId) {
              const hasDayAlready = task.days.includes(day);
              const updatedDays = hasDayAlready
                ? task.days.filter((d) => d !== day)
                : [...task.days, day];
              return { ...task, days: updatedDays };
            }
            return task;
          });
          return {
            ...member,
            tasks: updatedTasks,
            workload: calculateWorkload(updatedTasks),
          };
        }
        return member;
      }),
    });
  };

  const calculateWorkload = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    
    // Count total task-days
    const totalTaskDays = tasks.reduce((sum, task) => sum + task.days.length, 0);
    
    // Calculate workload percentage based on a theoretical max
    // Assuming 5 tasks with all 5 days would be 100%
    const maxPossibleTaskDays = 25; // 5 tasks × 5 days
    return Math.round((totalTaskDays / maxPossibleTaskDays) * 100);
  };

  const calculateMemberWorkload = (memberId: string): number => {
    const member = currentTeam.members.find((m) => m.id === memberId);
    if (!member) return 0;
    return member.workload;
  };

  const getWorkloadStatus = (percentage: number): WorkloadStatus => {
    if (percentage <= 50) return "Inadequada";
    if (percentage <= 80) return "Adequada";
    return "Elevada";
  };

  const getWorkloadColor = (status: WorkloadStatus): string => {
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
  
  const addUser = (name: string, email: string, role: UserRole) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
    };
    
    setUsers([...users, newUser]);
    toast.success(`Usuário ${name} adicionado com sucesso!`);
  };
  
  const removeUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    setUsers(users.filter(u => u.id !== id));
    toast.success(`Usuário ${user.name} removido com sucesso!`);
  };
  
  const editUser = (id: string, name: string, email: string, role: UserRole) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, name, email, role };
      }
      return user;
    }));
    
    toast.success(`Usuário atualizado com sucesso!`);
  };

  return (
    <TeamContext.Provider
      value={{
        currentTeam,
        isLoading,
        currentWeek,
        setCurrentWeek,
        addMember,
        removeMember,
        addTask,
        removeTask,
        editTask,
        transferTask,
        toggleTaskDay,
        calculateMemberWorkload,
        getWorkloadStatus,
        getWorkloadColor,
        users,
        addUser,
        removeUser,
        editUser,
        sprints,
        sprintFolders,
        addSprint,
        toggleSprintFolder,
        archiveSprint,
        unarchiveSprint,
        moveSprint
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
