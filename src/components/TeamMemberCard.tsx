
import React, { useState } from "react";
import { TeamMember, Day } from "@/types";
import { useTeam } from "@/context/TeamContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, Edit, Trash2, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { addTask, removeTask, editTask, toggleTaskDay, transferTask, currentTeam, removeMember } = useTeam();
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTask, setEditingTask] = useState<{ id: string; name: string } | null>(null);
  const [transferringTask, setTransferringTask] = useState<{ id: string; name: string } | null>(null);
  const [targetMember, setTargetMember] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const dayColors = {
    Seg: "bg-purple-500 text-white",
    Ter: "bg-purple-500 text-white",
    Qua: "bg-purple-500 text-white",
    Qui: "bg-purple-500 text-white",
    Sex: "bg-purple-500 text-white",
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask(member.id, newTaskName);
      setNewTaskName("");
      setIsAddingTask(false);
    }
  };

  const handleEditTask = () => {
    if (editingTask && editingTask.name.trim()) {
      editTask(member.id, editingTask.id, editingTask.name);
      setEditingTask(null);
    }
  };

  const handleTransferTask = () => {
    if (transferringTask && targetMember) {
      transferTask(transferringTask.id, member.id, targetMember);
      setTransferringTask(null);
      setTargetMember("");
    }
  };

  const handleToggleDay = (taskId: string, day: Day) => {
    toggleTaskDay(member.id, taskId, day);
  };

  const otherMembers = currentTeam.members.filter(m => m.id !== member.id);

  return (
    <div className="border-t pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="mr-3 h-8 w-8 bg-gray-200">
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.tasks.length} tarefas</p>
          </div>
        </div>
        <div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100">
            <span className="text-sm font-medium">{member.workload}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pl-11">
        {member.tasks.map((task) => (
          <div key={task.id} className="pb-3">
            <div className="flex justify-between items-center mb-1">
              <span>{task.name}</span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setEditingTask({ id: task.id, name: task.name })}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="space-y-2">
                      <h4 className="font-medium">Transferir tarefa</h4>
                      <p className="text-sm text-muted-foreground">Selecione para qual membro transferir:</p>
                      <div className="grid gap-2">
                        {otherMembers.map(m => (
                          <Button 
                            key={m.id} 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => {
                              transferTask(task.id, member.id, m.id);
                            }}
                          >
                            <Avatar className="mr-2 h-6 w-6">
                              <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
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
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => removeTask(member.id, task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-1">
              {(["Seg", "Ter", "Qua", "Qui", "Sex"] as Day[]).map((day) => (
                <button
                  key={day}
                  onClick={() => handleToggleDay(task.id, day)}
                  className={`h-7 w-10 text-xs font-medium ${
                    task.days.includes(day) ? dayColors[day] : "bg-gray-100 text-gray-600"
                  } rounded`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Add Task Button */}
        <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setIsAddingTask(true)}>
          <Plus className="h-4 w-4 mr-1" /> Adicionar tarefa
        </div>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome da tarefa"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingTask(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddTask}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome da tarefa"
              value={editingTask?.name || ""}
              onChange={(e) => setEditingTask(prev => prev ? {...prev, name: e.target.value} : null)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancelar
            </Button>
            <Button onClick={handleEditTask}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
