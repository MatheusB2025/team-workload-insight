
import React from "react";
import { Sprint, SprintFolder } from "@/context/team/types";
import { SprintFolderComponent } from "./SprintFolder";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarActions } from "./SidebarActions";
import { NewSprintDialog } from "./NewSprintDialog";
import { EditSprintDialog } from "./EditSprintDialog";
import { printSprint } from "@/utils/pdfExport";

interface SprintSidebarContentProps {
  sprintFolders: SprintFolder[];
  sprints: Sprint[];
  toggleSprintFolder: (folderId: string) => void;
  archiveSprint: (id: number) => void;
  unarchiveSprint: (id: number) => void;
  deleteSprint: (id: number) => void;
  editSprint: (sprintId: number, name: string, startDate?: string, endDate?: string) => void;
  addSprint: (startDate: Date, month: number, year: number) => void;
}

export const SprintSidebarContent: React.FC<SprintSidebarContentProps> = ({
  sprintFolders,
  sprints,
  toggleSprintFolder,
  archiveSprint,
  unarchiveSprint,
  deleteSprint,
  editSprint,
  addSprint
}) => {
  // Dialog state
  const [isNewSprintDialogOpen, setIsNewSprintDialogOpen] = React.useState(false);
  const [isEditSprintDialogOpen, setIsEditSprintDialogOpen] = React.useState(false);
  const [editingSprint, setEditingSprint] = React.useState<Sprint | null>(null);
  
  // Get the currently active sprint (first non-archived sprint)
  const activeSprint = sprints.find(sprint => !sprint.archived);
  
  const handleCreateSprint = (startDate: Date, month: number, year: number) => {
    addSprint(startDate, month, year);
  };
  
  const handleEditSprint = (sprintId: number, name: string, startDate?: string, endDate?: string) => {
    editSprint(sprintId, name, startDate, endDate);
  };
  
  const openEditDialog = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setIsEditSprintDialogOpen(true);
  };
  
  // Handle print sprint
  const handlePrintSprint = () => {
    if (activeSprint) {
      printSprint(activeSprint);
    } else {
      alert("Não há sprints disponíveis para imprimir.");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader 
        title="Sprints" 
        description="Organize as sprints por semana" 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Folders */}
          <div className="space-y-4">
            {sprintFolders.map(folder => (
              <SprintFolderComponent
                key={folder.id}
                folder={folder}
                sprints={sprints}
                onToggle={toggleSprintFolder}
                onEditSprint={openEditDialog}
                onArchiveSprint={archiveSprint}
                onUnarchiveSprint={unarchiveSprint}
                onDeleteSprint={deleteSprint}
              />
            ))}
          </div>
        </div>
      </div>
      
      <SidebarActions 
        onCreateSprint={() => setIsNewSprintDialogOpen(true)}
        onPrintSprint={handlePrintSprint}
        hasActiveSprint={Boolean(activeSprint)}
      />
      
      {/* Dialogs */}
      <NewSprintDialog 
        open={isNewSprintDialogOpen} 
        onOpenChange={setIsNewSprintDialogOpen}
        onCreateSprint={handleCreateSprint}
      />
      
      <EditSprintDialog
        open={isEditSprintDialogOpen}
        onOpenChange={setIsEditSprintDialogOpen}
        sprint={editingSprint}
        onSave={handleEditSprint}
      />
    </div>
  );
};
