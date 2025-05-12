
import { useState } from "react";
import { TeamLayout } from "@/components/Layouts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkloadChart } from "@/components/charts/WorkloadChart";
import { GanttChart } from "@/components/charts/GanttChart";
import { DailyDistributionChart } from "@/components/charts/DailyDistributionChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTeam } from "@/context/TeamContext";

const AnalysisPage = () => {
  const { currentWeek, setCurrentWeek, currentTeam, getWorkloadStatus, getWorkloadColor } = useTeam();

  return (
    <TeamLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-xl font-bold">Análise de Tarefas</h1>
          
          <div className="w-full md:w-64 mt-4 md:mt-0">
            <Select value={currentWeek} onValueChange={setCurrentWeek}>
              <SelectTrigger>
                <SelectValue placeholder="Semana Atual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semana Atual">Semana Atual</SelectItem>
                <SelectItem value="Semana 1 - 28/04 - 04/05">Semana 1 - 28/04 - 04/05</SelectItem>
                <SelectItem value="Semana 2 - 05/05 - 11/05">Semana 2 - 05/05 - 11/05</SelectItem>
                <SelectItem value="Semana 3 - 12/05 - 18/05">Semana 3 - 12/05 - 18/05</SelectItem>
                <SelectItem value="Semana 4 - 19/05 - 25/05">Semana 4 - 19/05 - 25/05</SelectItem>
                <SelectItem value="Semana 5 - 26/05 - 01/06">Semana 5 - 26/05 - 01/06</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Gantt Chart - Full width, matches the second image */}
        <div className="mb-8">
          <GanttChart />
        </div>
        
        {/* Two-column layout for Distribution Chart and Workload Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailyDistributionChart />
          
          <div>
            <WorkloadChart showDetails={true} />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Status da Carga de Trabalho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentTeam.members.map(member => {
                    const status = getWorkloadStatus(member.workload);
                    const colorClass = getWorkloadColor(status);
                    
                    return (
                      <div key={member.id} className="flex flex-col">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{member.name}</span>
                          <span className={`font-medium text-${colorClass}`}>{status}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`bg-${colorClass} h-2.5 rounded-full`} 
                            style={{ width: `${member.workload}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0%</span>
                          <span className="text-xs text-gray-500">{member.workload}%</span>
                          <span className="text-xs text-gray-500">100%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-workload-inadequate"></div>
                    <span className="text-sm">Inadequada (0-50%): Necessário rever atividades distribuídas (carga baixa)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-workload-adequate"></div>
                    <span className="text-sm">Adequada (51-80%): Distribuição ideal de tarefas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-workload-high"></div>
                    <span className="text-sm">Elevada (81-100%): Necessário rever atividades distribuídas (sobrecarga)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeamLayout>
  );
};

export default AnalysisPage;
