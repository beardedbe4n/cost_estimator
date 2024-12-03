import React from 'react';
import { Plus, Download } from 'lucide-react';
import { EstimateRow as EstimateRowType } from '../types';
import { EstimateRowComponent } from './EstimateRow';
import { exportToExcel } from '../utils/export';

interface Props {
  rows: EstimateRowType[];
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onAddRow: () => void;
  onUpdateRow: (id: string, field: keyof EstimateRowType, value: string | number) => void;
  onDeleteRow: (id: string) => void;
}

export function EstimateTable({ 
  rows, 
  projectName,
  onProjectNameChange,
  onAddRow, 
  onUpdateRow, 
  onDeleteRow 
}: Props) {
  const totalAmount = rows.reduce((sum, row) => 
    sum + (row.people * row.hours * row.rate * (row.coefficient || 1)), 0
  );

  const handleExport = () => {
    exportToExcel(rows, projectName);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="text-2xl font-bold text-gray-800 border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none pb-1 w-full"
            placeholder="Enter Project Name"
          />
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-6 gap-4 mb-4 font-medium text-gray-600">
            <div>Role/Task</div>
            <div>People</div>
            <div>Hours</div>
            <div>Rate (USD)</div>
            <div>Coefficient</div>
            <div>Total</div>
          </div>
          
          {rows.map((row) => (
            <EstimateRowComponent
              key={row.id}
              row={row}
              onChange={onUpdateRow}
              onDelete={onDeleteRow}
            />
          ))}
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={onAddRow}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add Row
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Download size={18} />
              Export to Excel
            </button>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-end items-center gap-4">
            <span className="text-lg font-medium text-gray-600">Total Cost:</span>
            <span className="text-2xl font-bold text-gray-800">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}