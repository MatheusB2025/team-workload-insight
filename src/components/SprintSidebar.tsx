
import React, { useState } from "react";
import { format, addWeeks, parseISO, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ListPlus, 
  FolderClosed, 
  FolderOpen, 
  Archive, 
  Check, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTeam } from "@/context/TeamContext";

export const SprintSidebar: React.FC = () => {
  const { sprints, sprintFolders, toggleSprintFolder, archiveSprint, unarchiveSprint, addSprint } = useTeam();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 12)); // May 12th 2025
  const [isNewSprintDialogOpen, setIsNewSprintDialogOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 = current week, 1 = next week, etc.
  const isMobile = useIsMobile();
  
  // Generate weeks for the select component
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const weekDate = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), i);
    const startDateStr = format(weekDate, "dd/MM", { locale: ptBR });
    const endDateStr = format(addWeeks(weekDate, 1), "dd/MM", { locale: ptBR });
    return { 
      value: i.toString(), 
      label: `Semana ${i+1} (${startDateStr} - ${endDateStr})` 
    };
  });

  const handleCreateNewSprint = () => {
    const startDate = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), selectedWeek);
    addSprint(startDate);
    setIsNewSprintDialogOpen(false);
  };
  
  const formatSprintDates = (startDate: string, endDate: string) => {
    const start = format(parseISO(startDate), "dd/MM");
    const end = format(parseISO(endDate), "dd/MM");
    return `${start} - ${end}`;
  };
  
  const renderSprints = (folderId: string, archived?: boolean) => {
    const filteredSprints = sprints.filter(sprint => 
      sprint.folderId === folderId && (archived ? sprint.archived : !sprint.archived)
    );
    
    if (filteredSprints.length === 0) {
      return null;
    }
    
    return (
      <div className="space-y-2 mt-1 pl-2">
        {filteredSprints.map(sprint => (
          <div key={sprint.id} className="flex items-center justify-between py-1 px-1 rounded hover:bg-gray-100 group">
            <div className="flex items-center">
              <ListPlus className="h-3 w-3 mr-2 text-gray-500" />
              <div>
                <div className="font-medium text-xs">{sprint.name}</div>
                <div className="text-xs text-gray-500">
                  {formatSprintDates(sprint.startDate, sprint.endDate)}
                </div>
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Archive className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" side="right">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">Gerenciar Sprint</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-xs h-7"
                      onClick={() => archived ? unarchiveSprint(sprint.id) : archiveSprint(sprint.id)}
                    >
                      <Archive className="h-3 w-3 mr-2" />
                      {archived ? "Restaurar sprint" : "Arquivar sprint"}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="font-medium text-base mb-2">Sprints</div>
        <div className="text-xs text-gray-500 mb-2">Organize as sprints por semana</div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Folders */}
          <div className="space-y-4">
            {sprintFolders.map(folder => (
              <div key={folder.id}>
                <Collapsible open={folder.isOpen} onOpenChange={() => toggleSprintFolder(folder.id)}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-medium text-xs py-1 h-8"
                    >
                      <div className="flex items-center">
                        {folder.isOpen ? (
                          <FolderOpen className="h-3.5 w-3.5 mr-2" />
                        ) : (
                          <FolderClosed className="h-3.5 w-3.5 mr-2" />
                        )}
                        {folder.name}
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${folder.isOpen ? 'rotate-90' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {/* Active Sprints */}
                    {renderSprints(folder.id)}
                    
                    {/* Archived Sprints - Showing directly without the button */}
                    {renderSprints(folder.id, true)}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-2 border-t">
        <Button 
          className="w-full flex items-center justify-center text-xs" 
          variant="outline"
          onClick={() => setIsNewSprintDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-2" />
          Nova Sprint
        </Button>
      </div>
      
      {/* New Sprint Dialog */}
      <Dialog open={isNewSprintDialogOpen} onOpenChange={setIsNewSprintDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Sprint</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
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
            <Button variant="outline" onClick={() => setIsNewSprintDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateNewSprint}>
              Criar Sprint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
