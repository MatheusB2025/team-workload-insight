
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsNewMemberDialogOpen: (isOpen: boolean) => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setIsNewMemberDialogOpen
}) => {
  return (
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
  );
};
