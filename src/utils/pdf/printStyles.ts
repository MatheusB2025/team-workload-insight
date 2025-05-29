
export const generatePrintStyles = () => {
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
