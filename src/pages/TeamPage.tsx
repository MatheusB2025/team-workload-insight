
import { useState } from "react";
import { TeamLayout } from "@/components/Layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { NewMemberDialog } from "@/components/NewMemberDialog";
import { useTeam } from "@/context/TeamContext";
import { WorkloadStatusPopover } from "@/components/WorkloadStatusPopover";
import { SprintSidebar } from "@/components/SprintSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const TeamPage = () => {
  const { currentTeam } = useTeam();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
  
  const filteredMembers = searchQuery.trim() 
    ? currentTeam.members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentTeam.members;

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SprintSidebar />
        
        <div className="flex-1">
          <TeamLayout>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="relative flex-1 sm:w-64">
                    <Input
                      type="text"
                      placeholder="Buscar colaborador..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={() => setIsNewMemberDialogOpen(true)}>
                    Novo Colaborador
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-medium">Colaborador</h2>
                  <h2 className="text-sm font-medium">Carga de Trabalho</h2>
                </div>
                
                <div className="mt-3">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <WorkloadStatusPopover key={member.id} memberId={member.id}>
                        <div>
                          <TeamMemberCard member={member} />
                        </div>
                      </WorkloadStatusPopover>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum colaborador encontrado</p>
                    </div>
                  )}
                </div>
              </div>
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
