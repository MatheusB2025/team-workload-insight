
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sprint } from "@/context/team/types";
import { format, parseISO } from "date-fns";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  useEffect(() => {
    if (sprint) {
      setSprintName(sprint.name);
      setStartDate(format(parseISO(sprint.startDate), "yyyy-MM-dd"));
      setEndDate(format(parseISO(sprint.endDate), "yyyy-MM-dd"));
    }
  }, [sprint]);

  const handleSave = () => {
    if (sprint) {
      onSave(sprint.id, sprintName, startDate, endDate);
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
          
          <div className="space-y-2">
            <label htmlFor="start-date" className="text-sm font-medium">
              Data de Início
            </label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="end-date" className="text-sm font-medium">
              Data de Término
            </label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
