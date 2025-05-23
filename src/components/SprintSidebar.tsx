
import React, { useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/context/TeamContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarContent,
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SprintSidebarContent } from "./sprint/SprintSidebarContent";

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
  
  // Prepare content to be used in both mobile and desktop views
  const sidebarContent = (
    <SprintSidebarContent
      sprintFolders={sprintFolders}
      sprints={sprints}
      toggleSprintFolder={toggleSprintFolder}
      archiveSprint={archiveSprint}
      unarchiveSprint={unarchiveSprint}
      deleteSprint={deleteSprint}
      editSprint={editSprint}
      addSprint={addSprint}
    />
  );
  
  // Render mobile drawer or desktop sidebar based on screen size
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
  
  // Desktop view with sidebar
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
