
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTeam } from "@/context/TeamContext";
import { DaysMap, DayFull, ShortDays } from "@/types";

export const DailyDistributionChart: React.FC = () => {
  const { currentTeam } = useTeam();
  
  // Process data for chart
  const chartData = ShortDays.map((day) => {
    const dayData: any = { name: DaysMap[day] };
    
    currentTeam.members.forEach(member => {
      const taskCount = member.tasks.filter(task => task.days.includes(day)).length;
      dayData[member.name] = taskCount;
    });
    
    return dayData;
  });
  
  // Create an array of colors for each member
  const memberColors = ["#9b87f5", "#92D9A2", "#FDDA75", "#FF9A8B", "#8EB8FA"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Tarefas por Dia</CardTitle>
        <p className="text-sm text-muted-foreground">Tarefas atribuídas a cada colaborador por dia da semana</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {currentTeam.members.map((member, index) => (
                <Bar
                  key={member.id}
                  dataKey={member.name}
                  stackId="a"
                  fill={memberColors[index % memberColors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
