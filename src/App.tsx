
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TeamProvider } from "@/context/TeamContext";
import { MainLayout } from "@/components/Layouts";

// Pages
import TeamPage from "@/pages/TeamPage";
import AnalysisPage from "@/pages/AnalysisPage";
import UsersPage from "@/pages/UsersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TeamProvider>
        <MainLayout>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/equipe" replace />} />
              <Route path="/equipe" element={<TeamPage />} />
              <Route path="/analise" element={<AnalysisPage />} />
              <Route path="/usuarios" element={<UsersPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MainLayout>
      </TeamProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
