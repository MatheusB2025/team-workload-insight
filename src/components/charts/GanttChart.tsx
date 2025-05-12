
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTeam } from "@/context/TeamContext";
import { FullDays } from "@/types";

export const GanttChart: React.FC = () => {
  const { currentTeam } = useTeam();

  // Generate task data for the Gantt chart
  const tasks = currentTeam.members.flatMap(member => 
    member.tasks.map(task => ({
      id: task.id,
      name: task.name,
      member: member.name,
      days: task.days,
      color: getMemberColor(member.id)
    }))
  );

  function getMemberColor(id: string): string {
    // Assign colors similar to the image provided
    const colors = ["bg-purple-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
    const index = parseInt(id.split("-")[1]) % colors.length;
    return colors[index];
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico Gantt de Tarefas</CardTitle>
        <p className="text-sm text-muted-foreground">Distribuição de tarefas por colaborador e dia</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Time scale header */}
            <div className="flex border-b">
              <div className="w-48 p-2 font-medium">Tarefa</div>
              <div className="flex-1 grid grid-cols-5">
                {FullDays.map(day => (
                  <div key={day} className="p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Task rows */}
            <div className="space-y-1 mt-2">
              {tasks.map(task => {
                const firstDayIndex = FullDays.findIndex(day => 
                  task.days.includes(day === "Segunda" ? "Seg" : 
                                   day === "Terça" ? "Ter" : 
                                   day === "Quarta" ? "Qua" : 
                                   day === "Quinta" ? "Qui" : "Sex")
                );
                
                return (
                  <div key={task.id} className="flex items-center">
                    <div className="w-48 p-2 truncate font-medium text-sm">
                      {task.name} - {task.member}
                    </div>
                    <div className="flex-1 grid grid-cols-5 gap-1 relative h-8">
                      {/* Task bar */}
                      <div 
                        className={`absolute h-6 ${task.color} rounded-md`}
                        style={{
                          left: `${(firstDayIndex / 5) * 100}%`,
                          width: `${(task.days.length / 5) * 100}%`,
                          maxWidth: "calc(100% - 4px)", // Prevent overflow
                          top: "4px"
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
