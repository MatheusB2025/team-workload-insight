
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format, addWeeks, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NewSprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSprint: (startDate: Date, month: number, year: number) => void;
}

export const NewSprintDialog: React.FC<NewSprintDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateSprint
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear] = useState<number>(2025);
  
  // Generate weeks for the select component
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const weekDate = addWeeks(startOfWeek(new Date(selectedYear, selectedMonth, 1), { weekStartsOn: 1 }), i);
    const startDateStr = format(weekDate, "dd/MM", { locale: ptBR });
    const endDateStr = format(addWeeks(weekDate, 1), "dd/MM", { locale: ptBR });
    return { 
      value: i.toString(), 
      label: `Semana ${i+1} (${startDateStr} - ${endDateStr})`,
      date: weekDate
    };
  });
  
  // Generate months for the select component
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(selectedYear, i, 1);
    return {
      value: i.toString(),
      label: format(date, "MMMM", { locale: ptBR }),
    };
  });

  const handleCreateNewSprint = () => {
    const startDate = weeks[selectedWeek].date;
    onCreateSprint(startDate, selectedMonth, selectedYear);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Sprint</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="month-select" className="text-sm font-medium">
              Selecione o mês
            </label>
            <Select 
              value={selectedMonth.toString()}
              onValueChange={(val) => setSelectedMonth(parseInt(val))}
            >
              <SelectTrigger id="month-select">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="week-select" className="text-sm font-medium">
              Selecione a semana
            </label>
            <Select 
              value={selectedWeek.toString()}
              onValueChange={(val) => setSelectedWeek(parseInt(val))}
            >
              <SelectTrigger id="week-select">
                <SelectValue placeholder="Selecione a semana" />
              </SelectTrigger>
              <SelectContent>
                {weeks.map(week => (
                  <SelectItem key={week.value} value={week.value}>
                    {week.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="copy-team" />
              <label
                htmlFor="copy-team"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Copiar equipe da sprint atual
              </label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreateNewSprint}>
            Criar Sprint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
