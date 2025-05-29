
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";

// ===== Date Formatting Utilities =====
const formatSprintDate = (dateString: string) => {
  return format(parseISO(dateString), "dd/MM", { locale: ptBR });
};

const getCurrentFormattedDate = () => {
  return format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
};

const getSprintFileName = (sprintName: string) => {
  return `sprint-${sprintName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
};

// ===== PDF Header Functions =====
const addPdfTitle = (pdf: jsPDF, title: string, yPosition: number) => {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(title, 20, yPosition);
  return yPosition + 10;
};

const addPdfPeriod = (pdf: jsPDF, startDate: string, endDate: string, yPosition: number) => {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(
    `Período: ${formatSprintDate(startDate)} - ${formatSprintDate(endDate)}`,
    20, 
    yPosition
  );
  return yPosition + 10;
};

const addPdfGenerationDate = (pdf: jsPDF, yPosition: number) => {
  pdf.setFontSize(12);
  pdf.text(
    `Documento gerado em: ${getCurrentFormattedDate()}`,
    20, 
    yPosition
  );
  return yPosition + 10;
};

// ===== Main PDF Export Function =====
export const exportSprintToPDF = async (sprint: Sprint) => {
  // Create new jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Add content to PDF
  let yPosition = 20;
  yPosition = addPdfTitle(pdf, `Sprint: ${sprint.name}`, yPosition);
  yPosition = addPdfPeriod(pdf, sprint.startDate, sprint.endDate, yPosition);
  addPdfGenerationDate(pdf, yPosition);
  
  // Save the PDF
  pdf.save(getSprintFileName(sprint.name));
};

// ===== HTML Generation Functions for Print =====

// Member HTML Components
const generateMemberAvatarHtml = (member: any) => {
  return member.image 
    ? `<img src="${member.image}" alt="${member.name}" />`
    : member.initials;
};

// Task HTML Components
const generateTaskDaysHtml = (task: any) => {
  if (!task.days || task.days.length === 0) {
    return '';
  }
  
  return task.days.map((day: string) => 
    `<span class="task-day">${day}</span>`
  ).join('');
};

const generateTasksListHtml = (tasks: any[]) => {
  if (!tasks || tasks.length === 0) {
    return '<p>Sem tarefas atribuídas</p>';
  }
  
  const taskItems = tasks.map(task => `
    <li class="task-item">
      <div class="task-name">${task.name}</div>
      <div class="task-days">
        ${generateTaskDaysHtml(task)}
      </div>
    </li>
  `).join('');
  
  return `<ul class="task-list">${taskItems}</ul>`;
};

const generateMemberCardHtml = (member: any) => {
  return `
    <div class="member-card">
      <div class="member-header">
        <div class="member-avatar">
          ${generateMemberAvatarHtml(member)}
        </div>
        <div class="member-info">
          <div class="member-name">${member.name}</div>
          <div class="workload">Carga: ${member.workload}%</div>
        </div>
      </div>
      ${generateTasksListHtml(member.tasks)}
    </div>
  `;
};

const generateMembersListHtml = (members: any[]) => {
  if (!members || members.length === 0) {
    return '<p>Nenhum membro na equipe</p>';
  }
  
  return members.map(member => generateMemberCardHtml(member)).join('');
};

// CSS Styling for Print
const generatePrintStyles = () => {
  return `
    <style>
      @media print {
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px; 
          font-size: 12px;
          margin: 0;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        @page {
          size: A4;
          margin: 10mm;
        }
        
        .member-card {
          page-break-inside: avoid;
          break-inside: avoid;
          display: block;
          margin-bottom: 8px;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 4px;
        }
        
        .member-header {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .task-list {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      }
      
      body { 
        font-family: Arial, sans-serif; 
        padding: 20px; 
        font-size: 12px;
        margin: 0;
      }
      h1 { font-size: 20px; margin-bottom: 8px; }
      h2 { font-size: 16px; margin-top: 15px; margin-bottom: 8px; }
      .sprint-details { margin-bottom: 20px; }
      p { font-size: 12px; margin: 3px 0; }
      .date { color: #666; }
      .footer { margin-top: 20px; font-size: 10px; color: #999; }
      .member-card { 
        border: 1px solid #ddd; 
        padding: 8px; 
        margin-bottom: 8px; 
        border-radius: 4px;
        display: block;
      }
      .member-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .member-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #555;
        border: 1px solid #ddd;
        overflow: hidden;
        font-size: 12px;
      }
      .member-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .member-name { font-weight: bold; font-size: 14px; }
      .member-info { 
        display: flex; 
        flex-direction: column;
        flex: 1;
      }
      .workload {
        font-size: 10px;
        color: #666;
      }
      .task-list { list-style-type: none; padding-left: 0; margin-top: 8px; }
      .task-item { 
        padding: 5px 3px;
        border-bottom: 1px solid #eee; 
        display: flex;
        justify-content: space-between;
        font-size: 11px;
      }
      .task-name { flex: 1; }
      .task-days { display: flex; gap: 3px; }
      .task-day { 
        padding: 1px 3px; 
        border-radius: 2px; 
        background-color: #e9ecef; 
        font-size: 9px; 
      }
    </style>
  `;
};

// Complete HTML Document
const generateHtmlDocument = (sprint: Sprint, members: any[]) => {
  return `
    <html>
      <head>
        <title>Sprint: ${sprint.name}</title>
        ${generatePrintStyles()}
      </head>
      <body>
        <h1>Sprint: ${sprint.name}</h1>
        <div class="sprint-details">
          <p>Período: ${formatSprintDate(sprint.startDate)} - ${formatSprintDate(sprint.endDate)}</p>
        </div>

        <h2>Equipe e Tarefas</h2>
        ${generateMembersListHtml(members)}
        <p class="footer">Documento impresso em: ${getCurrentFormattedDate()}</p>
      </body>
    </html>
  `;
};

// Global Team Data Handling
const getTeamData = () => {
  return window.__TEAM_DATA__ ? window.__TEAM_DATA__() : { members: [] };
};

// Main Print Function
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
