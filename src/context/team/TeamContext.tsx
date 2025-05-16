
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Day, User, UserRole, WorkloadStatus } from "@/types";
import { Team, TeamContextProps, Sprint, SprintFolder } from "./types";
import { calculateWorkload, getWorkloadStatus, getWorkloadColor } from "./workloadUtils";
import { 
  addSprint, 
  toggleSprintFolder, 
  archiveSprint, 
  unarchiveSprint, 
  moveSprint,
  deleteSprint,
  editSprint,
  createMonthFolders
} from "./sprintUtils";
import { 
  addMember, 
  removeMember, 
  addTask, 
  removeTask, 
  editTask, 
  transferTask, 
  toggleTaskDay,
  editMember
} from "./memberUtils";
import { 
  addUser, 
  removeUser, 
  editUser 
} from "./userUtils";
import { 
  initialTeam, 
  initialUsers, 
  initialSprintFolders, 
  initialSprints 
} from "./initialState";

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState("Semana Atual");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentTeam, setCurrentTeam] = useState<Team>(initialTeam);
  const [sprintFolders, setSprintFolders] = useState<SprintFolder[]>(initialSprintFolders);
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);

  // Create month folders on first load
  useEffect(() => {
    createMonthFolders(sprintFolders, setSprintFolders);
  }, []);

  const calculateMemberWorkload = (memberId: string): number => {
    const member = currentTeam.members.find((m) => m.id === memberId);
    if (!member) return 0;
    return member.workload;
  };

  return (
    <TeamContext.Provider
      value={{
        currentTeam,
        isLoading,
        currentWeek,
        setCurrentWeek,
        addMember: (name, image) => addMember(currentTeam, setCurrentTeam, name, image),
        removeMember: (id) => removeMember(currentTeam, setCurrentTeam, id),
        editMember: (id, name, image) => editMember(currentTeam, setCurrentTeam, id, name, image),
        addTask: (memberId, taskName) => addTask(currentTeam, setCurrentTeam, memberId, taskName),
        removeTask: (memberId, taskId) => removeTask(currentTeam, setCurrentTeam, memberId, taskId),
        editTask: (memberId, taskId, newTaskName) => editTask(currentTeam, setCurrentTeam, memberId, taskId, newTaskName),
        transferTask: (taskId, fromMemberId, toMemberId) => 
          transferTask(currentTeam, setCurrentTeam, taskId, fromMemberId, toMemberId),
        toggleTaskDay: (memberId, taskId, day) => 
          toggleTaskDay(currentTeam, setCurrentTeam, memberId, taskId, day),
        calculateMemberWorkload,
        getWorkloadStatus,
        getWorkloadColor,
        users,
        addUser: (name, email, role) => addUser(users, setUsers, name, email, role),
        removeUser: (id) => removeUser(users, setUsers, id),
        editUser: (id, name, email, role) => editUser(users, setUsers, id, name, email, role),
        sprints,
        sprintFolders,
        addSprint: (startDate, month, year) => addSprint(sprints, sprintFolders, setSprintFolders, setSprints, startDate, month, year),
        toggleSprintFolder: (folderId) => toggleSprintFolder(folderId, sprintFolders, setSprintFolders),
        archiveSprint: (sprintId) => archiveSprint(sprintId, sprints, setSprints),
        unarchiveSprint: (sprintId) => unarchiveSprint(sprintId, sprints, setSprints),
        moveSprint: (sprintId, folderId) => moveSprint(sprintId, folderId, sprints, setSprints),
        deleteSprint: (sprintId) => deleteSprint(sprintId, sprints, setSprints),
        editSprint: (sprintId, name, startDate, endDate) => editSprint(sprintId, sprints, setSprints, name, startDate, endDate)
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
