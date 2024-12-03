import * as XLSX from 'xlsx';
import { EstimateRow } from '../types';

export const exportToExcel = (rows: EstimateRow[], projectName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(
    rows.map(row => ({
      'Role/Task': row.role,
      'People': row.people,
      'Hours': row.hours,
      'Rate (USD)': row.rate,
      'Coefficient': row.coefficient,
      'Total': row.people * row.hours * row.rate * row.coefficient
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate');

  // Add total row
  const totalAmount = rows.reduce((sum, row) => 
    sum + (row.people * row.hours * row.rate * row.coefficient), 0
  );
  
  XLSX.utils.sheet_add_json(worksheet, [{
    'Role/Task': 'TOTAL',
    'Total': totalAmount
  }], { skipHeader: true, origin: -1 });

  XLSX.writeFile(workbook, `${projectName.replace(/\s+/g, '-')}-estimate.xlsx`);
};