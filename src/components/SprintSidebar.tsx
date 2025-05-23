
import React, { useState, useEffect } from "react";
import { Calendar, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/context/TeamContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sprint } from "@/context/team/types";
import { SprintFolderComponent } from "./sprint/SprintFolder";
import { NewSprintDialog } from "./sprint/NewSprintDialog";
import { EditSprintDialog } from "./sprint/EditSprintDialog";
import { printSprint } from "@/utils/pdfExport";

// Declare global interface for window to store team data
declare global {
  interface Window {
    __TEAM_DATA__?: () => any;
  }
}

export const SprintSidebar: React.FC = () => {
  const { 
    sprints, 
    sprintFolders, 
    toggleSprintFolder, 
    archiveSprint, 
    unarchiveSprint, 
    addSprint,
    deleteSprint,
    editSprint,
    currentTeam
  } = useTeam();
  
  // New sprint state
  const [isNewSprintDialogOpen, setIsNewSprintDialogOpen] = useState(false);
  
  // Edit sprint state
  const [isEditSprintDialogOpen, setIsEditSprintDialogOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  
  const isMobile = useIsMobile();
  
  // Make team data available globally for the print function
  useEffect(() => {
    window.__TEAM_DATA__ = () => ({
      members: currentTeam.members
    });
    
    return () => {
      delete window.__TEAM_DATA__;
    };
  }, [currentTeam]);
  
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
  
  // Get the currently active sprint (first non-archived sprint)
  const activeSprint = sprints.find(sprint => !sprint.archived);
  
  // Handle print sprint
  const handlePrintSprint = () => {
    if (activeSprint) {
      printSprint(activeSprint);
    } else {
      alert("Não há sprints disponíveis para imprimir.");
    }
  };
  
  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="font-medium text-base mb-2">Sprints</div>
        <div className="text-xs text-gray-500 mb-2">Organize as sprints por semana</div>
      </div>
      
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
      
      <div className="p-2 border-t space-y-2">
        <Button 
          className="w-full flex items-center justify-center text-xs" 
          variant="outline"
          onClick={() => setIsNewSprintDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-2" />
          Nova Sprint
        </Button>
        
        <Button 
          className="w-full flex items-center justify-center text-xs" 
          variant="outline"
          onClick={handlePrintSprint}
        >
          <Printer className="h-3 w-3 mr-2" />
          Imprimir Sprint Atual
        </Button>
      </div>
      
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
  
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Sprints
          </Button>
        </DrawerTrigger>
        <DrawerContent>{sidebarContent}</DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Sidebar 
      className="w-60 border-r hidden md:block"
      collapsible="none"
    >
      <SidebarContent>
        {sidebarContent}
      </SidebarContent>
    </Sidebar>
  );
};
