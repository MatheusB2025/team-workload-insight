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
    // Assign a color based on member id to keep it consistent
    const colors = ["bg-purple-400", "bg-green-400", "bg-yellow-400"];
    const index = parseInt(id.split("-")[1]) % colors.length;
    return colors[index];
  }
  
  // Group tasks by day
  const tasksByDay: Record<string, any[]> = {};
  FullDays.forEach(day => {
    tasksByDay[day] = [];
  });
  
  tasks.forEach(task => {
    task.days.forEach(day => {
      const fullDay = day === "Seg" ? "Segunda" : 
                     day === "Ter" ? "Terça" :
                     day === "Qua" ? "Quarta" :
                     day === "Qui" ? "Quinta" : "Sexta";
      
      tasksByDay[fullDay].push({
        id: task.id,
        name: `${task.name} - ${task.member}`,
        color: task.color
      });
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico Gantt de Tarefas</CardTitle>
        <p className="text-sm text-muted-foreground">Distribuição de tarefas por colaborador e dia</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5">
              {FullDays.map(day => (
                <div key={day} className="p-2 text-center font-medium border-b">
                  {day}
                </div>
              ))}
              
              <div className="col-span-5">
                {tasks.map(task => {
                  const startDayIndex = FullDays.findIndex(day => 
                    task.days.includes(day === "Segunda" ? "Seg" : 
                                     day === "Terça" ? "Ter" : 
                                     day === "Quarta" ? "Qua" : 
                                     day === "Quinta" ? "Qui" : "Sex")
                  );
                  
                  const taskLength = task.days.length;
                  
                  // Calculate position and span
                  const style = {
                    gridColumnStart: startDayIndex + 1,
                    gridColumnEnd: startDayIndex + taskLength + 1,
                    gridRow: "auto"
                  };
                  
                  return (
                    <div 
                      key={task.id}
                      className={`${task.color} text-white p-2 m-1 rounded text-sm`}
                      style={style}
                    >
                      {task.name} - {task.member}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
