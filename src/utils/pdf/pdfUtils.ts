
import { jsPDF } from 'jspdf';
import { Sprint } from "@/context/team/types";
import { getSprintFileName } from './dateUtils';

export const addPdfTitle = (pdf: jsPDF, title: string, yPosition: number) => {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(title, 20, yPosition);
  return yPosition + 10;
};

export const addPdfPeriod = (pdf: jsPDF, startDate: string, endDate: string, yPosition: number) => {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  // Note: formatSprintDate is not used here to avoid circular imports
  return yPosition + 10;
};

export const addPdfGenerationDate = (pdf: jsPDF, yPosition: number) => {
  pdf.setFontSize(12);
  // Note: getCurrentFormattedDate is not used here to avoid circular imports
  return yPosition + 10;
};

export const createPDF = (sprint: Sprint) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let yPosition = 20;
  yPosition = addPdfTitle(pdf, `Sprint: ${sprint.name}`, yPosition);
  
  pdf.save(getSprintFileName(sprint.name));
};
