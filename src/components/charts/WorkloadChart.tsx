
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTeam } from "@/context/TeamContext";

interface WorkloadChartProps {
  showDetails?: boolean;
}

export const WorkloadChart: React.FC<WorkloadChartProps> = ({ showDetails = false }) => {
  const { currentTeam, getWorkloadStatus } = useTeam();
  
  const data = currentTeam.members.map(member => ({
    name: member.name,
    value: member.workload,
    id: member.id
  }));

  const COLORS = ["#9b87f5", "#92D9A2", "#FDDA75"];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  const findMostTasksMember = () => {
    let maxTasks = 0;
    let memberWithMost = null;
    
    for (const member of currentTeam.members) {
      if (member.tasks.length > maxTasks) {
        maxTasks = member.tasks.length;
        memberWithMost = member.name;
      }
    }
    
    return memberWithMost;
  };
  
  const mostTasksMember = findMostTasksMember();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Carga de Trabalho</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={showDetails ? 80 : 100}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {showDetails && (
          <div className="mt-4 border-t pt-4">
            <p className="text-center font-medium">Colaborador com mais tarefas:</p>
            <p className="text-center text-xl">{mostTasksMember}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
