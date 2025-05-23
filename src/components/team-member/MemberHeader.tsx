
import React, { useState } from "react";
import { TeamMember } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface MemberHeaderProps {
  member: TeamMember;
  onEdit: () => void;
  onRemove: () => void;
}

export const MemberHeader: React.FC<MemberHeaderProps> = ({ member, onEdit, onRemove }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Avatar className="mr-2 h-7 w-7 bg-gray-200">
          {member.image ? (
            <AvatarImage src={member.image} alt={member.name} />
          ) : (
            <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{member.name}</h3>
          <p className="text-xs text-gray-500">{member.tasks.length} tarefas</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
          <span className="text-xs font-medium">{member.workload}%</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => setIsConfirmingDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Colaborador</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o colaborador <span className="font-semibold">{member.name}</span>? 
              Esta ação não poderá ser desfeita e todas as tarefas associadas serão removidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onRemove} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
