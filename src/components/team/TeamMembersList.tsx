
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { WorkloadStatusPopover } from "@/components/WorkloadStatusPopover";
import { TeamMember } from "@/context/team/types";

interface TeamMembersListProps {
  filteredMembers: TeamMember[];
  isTeamListCollapsed: boolean;
  setIsTeamListCollapsed: (isCollapsed: boolean) => void;
}

export const TeamMembersList: React.FC<TeamMembersListProps> = ({
  filteredMembers,
  isTeamListCollapsed,
  setIsTeamListCollapsed
}) => {
  return (
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
  );
};
