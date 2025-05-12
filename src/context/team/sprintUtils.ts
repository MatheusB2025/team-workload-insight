
import { format, endOfWeek, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint, SprintFolder } from "./types";
import { toast } from "sonner";

export const addSprint = (
  sprints: Sprint[], 
  sprintFolders: SprintFolder[],
  setSprintFolders: React.Dispatch<React.SetStateAction<SprintFolder[]>>,
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>,
  startDate: Date
) => {
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

export const toggleSprintFolder = (
  folderId: string,
  sprintFolders: SprintFolder[],
  setSprintFolders: React.Dispatch<React.SetStateAction<SprintFolder[]>>
) => {
  setSprintFolders(
    sprintFolders.map((folder) => 
      folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder
    )
  );
};

export const archiveSprint = (
  sprintId: number,
  sprints: Sprint[],
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>
) => {
  setSprints(
    sprints.map((sprint) => 
      sprint.id === sprintId ? { ...sprint, archived: true } : sprint
    )
  );
  toast.success("Sprint arquivada com sucesso!");
};

export const unarchiveSprint = (
  sprintId: number,
  sprints: Sprint[],
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>
) => {
  setSprints(
    sprints.map((sprint) => 
      sprint.id === sprintId ? { ...sprint, archived: false } : sprint
    )
  );
  toast.success("Sprint restaurada com sucesso!");
};

export const moveSprint = (
  sprintId: number,
  folderId: string,
  sprints: Sprint[],
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>
) => {
  setSprints(
    sprints.map((sprint) => 
      sprint.id === sprintId ? { ...sprint, folderId } : sprint
    )
  );
};
