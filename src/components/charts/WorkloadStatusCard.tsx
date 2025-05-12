
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTeam } from "@/context/TeamContext";

export const WorkloadStatusCard = () => {
  const { currentTeam, getWorkloadStatus, getWorkloadColor } = useTeam();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium mb-4">Status da Carga de Trabalho</h3>
        <div className="space-y-4">
          {currentTeam.members.map(member => {
            const status = getWorkloadStatus(member.workload);
            const colorClass = getWorkloadColor(status);
            
            return (
              <div key={member.id} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{member.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{member.workload}%</span>
                    <span className={`text-xs font-medium text-${colorClass}`}>({status})</span>
                  </div>
                </div>
                <Progress 
                  value={member.workload} 
                  className={`h-2 bg-muted`}
                  indicatorClassName={`bg-${colorClass}`} 
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-workload-inadequate"></div>
            <span>Inadequada (0-50%): Necessário rever atividades distribuídas (carga baixa)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-workload-adequate"></div>
            <span>Adequada (51-80%): Distribuição ideal de tarefas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-workload-high"></div>
            <span>Elevada (81-100%): Necessário rever atividades distribuídas (sobrecarga)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
