import { Team, TeamMember, Task } from "@/types";
import { Day } from "@/types";
import { toast } from "sonner";
import { calculateWorkload } from "./workloadUtils";

export const addMember = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  name: string, 
  image?: string
) => {
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

export const removeMember = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  id: string
) => {
  const member = currentTeam.members.find((m) => m.id === id);
  if (!member) return;

  setCurrentTeam({
    ...currentTeam,
    members: currentTeam.members.filter((member) => member.id !== id),
  });

  toast.success(`Colaborador ${member.name} removido com sucesso!`);
};

export const addTask = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string, 
  taskName: string
) => {
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

export const removeTask = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string, 
  taskId: string
) => {
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

export const editTask = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string, 
  taskId: string, 
  newTaskName: string
) => {
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

export const transferTask = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  taskId: string, 
  fromMemberId: string, 
  toMemberId: string
) => {
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

export const toggleTaskDay = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  memberId: string, 
  taskId: string, 
  day: Day
) => {
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

export const editMember = (
  currentTeam: Team,
  setCurrentTeam: React.Dispatch<React.SetStateAction<Team>>,
  id: string,
  name: string,
  image?: string
) => {
  // Generate new initials if name has changed
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  setCurrentTeam({
    ...currentTeam,
    members: currentTeam.members.map((member) => {
      if (member.id === id) {
        return { ...member, name, initials, image };
      }
      return member;
    }),
  });

  toast.success(`Colaborador ${name} atualizado com sucesso!`);
};
