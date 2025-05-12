
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
import { 
  Archive, 
  Calendar,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  
  // Format sprint dates for display
  const formatSprintDate = (dateString: string) => {
    return format(parseISO(dateString), "dd/MM", { locale: ptBR });
  };

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

              {/* Sprint Selector and Actions */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <Select 
                    defaultValue={firstWeekSprint ? String(firstWeekSprint.id) : undefined}
                    onValueChange={(value) => setSelectedSprintId(Number(value))}
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Selecionar sprint" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSprints.map(sprint => (
                        <SelectItem key={sprint.id} value={String(sprint.id)}>
                          {sprint.name} ({formatSprintDate(sprint.startDate)} - {formatSprintDate(sprint.endDate)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowArchivedSprints(!showArchivedSprints)}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Sprints Arquivadas
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => archiveSprint(selectedSprintId || (firstWeekSprint?.id || 0))}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Arquivar Sprint
                  </Button>
                </div>
              </div>

              {/* Archived Sprints Section */}
              {showArchivedSprints && archivedSprints.length > 0 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-3 text-sm">Sprints Arquivadas</h3>
                  <div className="space-y-2">
                    {archivedSprints.map(sprint => (
                      <div key={sprint.id} className="flex justify-between items-center p-2 bg-white rounded border">
                        <div>
                          <span className="font-medium text-sm">{sprint.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({formatSprintDate(sprint.startDate)} - {formatSprintDate(sprint.endDate)})
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => unarchiveSprint(sprint.id)}
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1" />
                          Restaurar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Collapsible
                open={!isTeamListCollapsed}
                onOpenChange={(isOpen) => setIsTeamListCollapsed(!isOpen)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-medium">Colaborador</h2>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium">Carga de Trabalho</h2>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                        {isTeamListCollapsed ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent>
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
                </CollapsibleContent>
              </Collapsible>
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
