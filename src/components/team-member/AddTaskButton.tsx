
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddTaskButtonProps {
  onAddTask: (taskName: string) => void;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      onAddTask(newTaskName);
      setNewTaskName("");
      setIsAddingTask(false);
    }
  };

  return (
    <>
      <div 
        className="flex items-center text-xs text-gray-500 hover:text-gray-700 cursor-pointer" 
        onClick={() => setIsAddingTask(true)}
      >
        <Plus className="h-3 w-3 mr-1" /> Adicionar tarefa
      </div>

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
    </>
  );
};
