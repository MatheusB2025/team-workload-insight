
import { useState } from "react";
import { TeamLayout } from "@/components/Layouts";
import { NewMemberDialog } from "@/components/NewMemberDialog";
import { useTeam } from "@/context/TeamContext";
import { SprintSidebar } from "@/components/SprintSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TeamHeader } from "@/components/team/TeamHeader";
import { SprintSelector } from "@/components/team/SprintSelector";
import { ArchivedSprintsList } from "@/components/team/ArchivedSprintsList";
import { TeamMembersList } from "@/components/team/TeamMembersList";

const TeamPage = () => {
  const { currentTeam, sprints, archiveSprint, unarchiveSprint } = useTeam();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
  const [isTeamListCollapsed, setIsTeamListCollapsed] = useState(false);
  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
  const [showArchivedSprints, setShowArchivedSprints] = useState(false);
  
  const filteredMembers = searchQuery.trim() 
    ? currentTeam.members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentTeam.members;

  // Get the first week sprint of the current month
  const firstWeekSprint = sprints.find(sprint => sprint.name === "Semana 1" && !sprint.archived);
  
  // Get available sprints for dropdown
  const availableSprints = sprints.filter(sprint => !sprint.archived);
  
  // Get archived sprints
  const archivedSprints = sprints.filter(sprint => sprint.archived);

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SprintSidebar />
        
        <div className="flex-1">
          <TeamLayout>
            <div className="p-6">
              <TeamHeader 
                setIsNewMemberDialogOpen={setIsNewMemberDialogOpen}
              />

              <SprintSelector 
                availableSprints={availableSprints}
                selectedSprintId={selectedSprintId}
                setSelectedSprintId={setSelectedSprintId}
                showArchivedSprints={showArchivedSprints}
                setShowArchivedSprints={setShowArchivedSprints}
                archiveSprint={archiveSprint}
                firstWeekSprint={firstWeekSprint}
              />

              <ArchivedSprintsList 
                archivedSprints={archivedSprints}
                unarchiveSprint={unarchiveSprint}
                showArchivedSprints={showArchivedSprints}
              />

              <TeamMembersList 
                filteredMembers={filteredMembers}
                isTeamListCollapsed={isTeamListCollapsed}
                setIsTeamListCollapsed={setIsTeamListCollapsed}
              />
            </div>
            
            <NewMemberDialog 
              open={isNewMemberDialogOpen}
              onOpenChange={setIsNewMemberDialogOpen}
            />
          </TeamLayout>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeamPage;
