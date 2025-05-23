
import React from "react";
import { Button } from "@/components/ui/button";

interface TeamHeaderProps {
  setIsNewMemberDialogOpen: (isOpen: boolean) => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  setIsNewMemberDialogOpen
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Gerenciamento de Equipe</h2>
      <Button onClick={() => setIsNewMemberDialogOpen(true)}>
        Novo Colaborador
      </Button>
    </div>
  );
};
