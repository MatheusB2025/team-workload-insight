
import React, { useState } from "react";
import { format, addMonths, subMonths, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight, ListPlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sprint } from "@/types";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const initialSprints: Sprint[] = [
  { id: 1, name: "Semana 1", startDate: "2025-03-31", endDate: "2025-04-06" },
  { id: 2, name: "Semana 2", startDate: "2025-04-07", endDate: "2025-04-13" },
  { id: 3, name: "Semana 3", startDate: "2025-04-14", endDate: "2025-04-20" },
  { id: 4, name: "Semana 4", startDate: "2025-04-21", endDate: "2025-04-27" },
  { id: 5, name: "Semana 5", startDate: "2025-04-28", endDate: "2025-05-04" },
];

export const SprintSidebar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 3, 1)); // Abril 2025
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const isMobile = useIsMobile();
  
  const monthName = format(currentMonth, "MMMM yyyy", { locale: ptBR });
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const formatSprintDates = (sprint: Sprint) => {
    const start = format(parseISO(sprint.startDate), "dd/MM");
    const end = format(parseISO(sprint.endDate), "dd/MM");
    return `${start} - ${end}`;
  };
  
  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="font-medium text-base">{monthName}</div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-3 w-3" />
            <span className="font-medium text-xs">Sprints Semanais</span>
          </div>
          
          <div className="space-y-2 mt-3">
            {sprints.map(sprint => (
              <div key={sprint.id} className="flex items-center py-2">
                <ListPlus className="h-3 w-3 mr-2 text-gray-500" />
                <div>
                  <div className="font-medium text-xs">{sprint.name}</div>
                  <div className="text-xs text-gray-500">{formatSprintDates(sprint)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-2 border-t">
        <Button className="w-full flex items-center justify-center text-xs" variant="outline">
          <ListPlus className="h-3 w-3 mr-2" />
          Nova Sprint
        </Button>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Sprints
          </Button>
        </DrawerTrigger>
        <DrawerContent>{sidebarContent}</DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Sidebar 
      className="w-60 border-r hidden md:block"
      collapsible="none"
    >
      <SidebarContent>
        {sidebarContent}
      </SidebarContent>
    </Sidebar>
  );
};
