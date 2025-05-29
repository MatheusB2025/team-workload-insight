
import { Sprint } from "@/context/team/types";
import { createPDF } from './pdf/pdfUtils';
import { generateHtmlDocument, getTeamData } from './pdf/documentUtils';

// Declare global interface for window to store team data
declare global {
  interface Window {
    __TEAM_DATA__?: () => any;
  }
}

export const exportSprintToPDF = async (sprint: Sprint) => {
  createPDF(sprint);
};

export const printSprint = (sprint: Sprint) => {
  // Get team data
  const teamData = getTeamData();
  const members = teamData?.members || [];
  
  // Create a temporary window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Por favor, permita popups para imprimir a sprint');
    return;
  }
  
  // Generate and write HTML content
  const htmlContent = generateHtmlDocument(sprint, members);
  printWindow.document.write(htmlContent);
  
  // Print and close after timeout
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
};
