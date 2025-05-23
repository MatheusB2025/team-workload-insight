
import React, { useState } from "react";
import { Task, Day, TeamMember } from "@/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, ArrowRight, Trash2 } from "lucide-react";
import { TaskDaySelector } from "./TaskDaySelector";

interface MemberTaskItemProps {
  task: Task;
  member: TeamMember;
  otherMembers: TeamMember[];
  onEditTask: (taskId: string, newName: string) => void;
  onRemoveTask: (taskId: string) => void;
  onToggleTaskDay: (taskId: string, day: Day) => void;
  onTransferTask: (taskId: string, toMemberId: string) => void;
}

export const MemberTaskItem: React.FC<MemberTaskItemProps> = ({
  task,
  member,
  otherMembers,
  onEditTask,
  onRemoveTask,
  onToggleTaskDay,
  onTransferTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);

  const handleEditSave = () => {
    if (editedTaskName.trim()) {
      onEditTask(task.id, editedTaskName);
      setIsEditing(false);
    }
  };

  const handleToggleDay = (day: Day) => {
    onToggleTaskDay(task.id, day);
  };

  return (
    <div className="pb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs">{task.name}</span>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => {
              setEditedTaskName(task.name);
              setIsEditing(true);
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2">
              <div className="space-y-1">
                <h4 className="text-xs font-medium">Transferir tarefa</h4>
                <p className="text-xs text-muted-foreground">Selecione para qual membro transferir:</p>
                <div className="grid gap-1">
                  {otherMembers.map(m => (
                    <Button 
                      key={m.id} 
                      variant="outline" 
                      className="justify-start h-7 text-xs py-0 px-2"
                      onClick={() => {
                        onTransferTask(task.id, m.id);
                      }}
                    >
                      <Avatar className="mr-1 h-4 w-4">
                        <AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback>
                      </Avatar>
                      {m.name}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-destructive hover:text-destructive"
            onClick={() => onRemoveTask(task.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <TaskDaySelector 
        selectedDays={task.days} 
        onToggleDay={handleToggleDay} 
      />

      {/* Edit Task Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome da tarefa"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
