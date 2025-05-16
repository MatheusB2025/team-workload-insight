
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sprint } from "@/context/team/types";

interface EditSprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sprint: Sprint | null;
  onSave: (sprintId: number, name: string, startDate?: string, endDate?: string) => void;
}

export const EditSprintDialog: React.FC<EditSprintDialogProps> = ({ 
  open, 
  onOpenChange,
  sprint,
  onSave
}) => {
  const [sprintName, setSprintName] = useState("");
  
  useEffect(() => {
    if (sprint) {
      setSprintName(sprint.name);
    }
  }, [sprint]);

  const handleSave = () => {
    if (sprint) {
      onSave(sprint.id, sprintName);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Sprint</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="sprint-name" className="text-sm font-medium">
              Nome da Sprint
            </label>
            <Input
              id="sprint-name"
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
