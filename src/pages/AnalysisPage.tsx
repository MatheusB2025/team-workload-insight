
import { useState } from "react";
import { TeamLayout } from "@/components/Layouts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkloadChart } from "@/components/charts/WorkloadChart";
import { GanttChart } from "@/components/charts/GanttChart";
import { DailyDistributionChart } from "@/components/charts/DailyDistributionChart";
import { WorkloadStatusCard } from "@/components/charts/WorkloadStatusCard";
import { Card, CardContent } from "@/components/ui/card";
import { useTeam } from "@/context/TeamContext";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalysisPage = () => {
  const { currentWeek, setCurrentWeek, currentTeam, getWorkloadStatus, getWorkloadColor } = useTeam();
  const [activeTab, setActiveTab] = useState("charts");

  return (
    <TeamLayout>
      <div className="p-6">
        {/* Removed duplicate title and week selector since TeamLayout already contains it */}
        
        {/* Gantt Chart - Full width */}
        <div className="mb-8">
          <GanttChart />
        </div>
        
        {/* Tabs for different analysis views */}
        <Tabs defaultValue="charts" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="workload">Carga de Trabalho</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-4">
            {/* Two-column layout for Distribution Chart and Workload Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyDistributionChart />
              <WorkloadChart showDetails={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="workload">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Detailed workload status card */}
              <WorkloadStatusCard />
              
              {/* Right: Individual workload cards */}
              <div className="grid grid-cols-1 gap-4 content-start">
                {currentTeam.members.map(member => {
                  const status = getWorkloadStatus(member.workload);
                  const colorClass = getWorkloadColor(status);
                  
                  return (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{member.name}</h3>
                            <p className={`text-xs text-${colorClass}`}>{status}</p>
                          </div>
                          <div className="text-2xl font-semibold">{member.workload}%</div>
                        </div>
                        
                        <Progress 
                          value={member.workload} 
                          className="h-2" 
                          indicatorClassName={`bg-${colorClass}`}
                        />
                        
                        <p className="mt-3 text-xs text-gray-500">
                          {status === "Inadequada" && "Necessário rever atividades distribuídas (carga baixa)"}
                          {status === "Adequada" && "Distribuição ideal de tarefas"}
                          {status === "Elevada" && "Necessário rever atividades distribuídas (sobrecarga)"}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TeamLayout>
  );
};

export default AnalysisPage;
