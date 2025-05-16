
import React, { useState } from "react";
import { Calendar, Plus } from "lucide-react";
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

export const SprintSidebar: React.FC = () => {
  const { 
    sprints, 
    sprintFolders, 
    toggleSprintFolder, 
    archiveSprint, 
    unarchiveSprint, 
    addSprint,
    deleteSprint,
    editSprint
  } = useTeam();
  
  // New sprint state
  const [isNewSprintDialogOpen, setIsNewSprintDialogOpen] = useState(false);
  
  // Edit sprint state
  const [isEditSprintDialogOpen, setIsEditSprintDialogOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  
  const isMobile = useIsMobile();
  
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
      
      <div className="p-2 border-t">
        <Button 
          className="w-full flex items-center justify-center text-xs" 
          variant="outline"
          onClick={() => setIsNewSprintDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-2" />
          Nova Sprint
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
