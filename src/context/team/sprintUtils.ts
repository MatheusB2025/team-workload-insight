
import { format, endOfWeek, startOfWeek, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint, SprintFolder } from "./types";
import { toast } from "sonner";

export const addSprint = (
  sprints: Sprint[], 
  sprintFolders: SprintFolder[],
  setSprintFolders: React.Dispatch<React.SetStateAction<SprintFolder[]>>,
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>,
  startDate: Date,
  month?: number,
  year?: number
) => {
  // Use specified month/year or extract from date
  const targetDate = month !== undefined && year !== undefined
    ? new Date(year, month, 1) // Create date with specified month and year
    : startDate;
  
  // Format the month for folder name
  const monthYear = format(targetDate, "MMMM yyyy", { locale: ptBR });
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

export const deleteSprint = (
  sprintId: number,
  sprints: Sprint[],
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>
) => {
  setSprints(sprints.filter(sprint => sprint.id !== sprintId));
  toast.success("Sprint excluída com sucesso!");
};

export const editSprint = (
  sprintId: number,
  sprints: Sprint[],
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>,
  newName: string,
  newStartDate?: string,
  newEndDate?: string
) => {
  setSprints(
    sprints.map((sprint) => 
      sprint.id === sprintId 
        ? { 
            ...sprint, 
            name: newName,
            startDate: newStartDate || sprint.startDate,
            endDate: newEndDate || sprint.endDate
          } 
        : sprint
    )
  );
  toast.success("Sprint atualizada com sucesso!");
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

export const createMonthFolders = (
  sprintFolders: SprintFolder[],
  setSprintFolders: React.Dispatch<React.SetStateAction<SprintFolder[]>>,
) => {
  // Create folders for all months of 2025 starting from May
  const startMonth = 4; // May (0-indexed)
  const year = 2025;
  const months = [];
  
  for (let month = startMonth; month < 12; month++) {
    const date = new Date(year, month, 1);
    const monthYear = format(date, "MMMM yyyy", { locale: ptBR });
    const capitalizedMonthYear = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
    
    // Check if folder already exists
    if (!sprintFolders.some(folder => folder.name === capitalizedMonthYear)) {
      months.push({
        id: `folder-${year}-${month}`,
        name: capitalizedMonthYear,
        isOpen: month === startMonth // Only keep the current month open
      });
    }
  }
  
  if (months.length > 0) {
    setSprintFolders([...sprintFolders, ...months]);
  }
};
