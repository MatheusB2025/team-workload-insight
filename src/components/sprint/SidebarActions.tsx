
import React from "react";
import { Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sprint } from "@/context/team/types";

interface SidebarActionsProps {
  onCreateSprint: () => void;
  onPrintSprint: () => void;
  hasActiveSprint: boolean;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({
  onCreateSprint,
  onPrintSprint,
  hasActiveSprint
}) => {
  return (
    <div className="p-2 border-t space-y-2">
      <Button 
        className="w-full flex items-center justify-center text-xs" 
        variant="outline"
        onClick={onCreateSprint}
      >
        <Plus className="h-3 w-3 mr-2" />
        Nova Sprint
      </Button>
      
      <Button 
        className="w-full flex items-center justify-center text-xs" 
        variant="outline"
        onClick={onPrintSprint}
        disabled={!hasActiveSprint}
      >
        <Printer className="h-3 w-3 mr-2" />
        Imprimir Sprint Atual
      </Button>
    </div>
  );
};
