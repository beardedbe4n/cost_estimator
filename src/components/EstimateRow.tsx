import React from 'react';
import { Trash2 } from 'lucide-react';
import { EstimateRow } from '../types';

interface Props {
  row: EstimateRow;
  onChange: (
    id: string,
    field: keyof EstimateRow,
    value: string | number
  ) => void;
  onDelete: (id: string) => void;
}

export function EstimateRowComponent({ row, onChange, onDelete }: Props) {
  const total =
    (row.people || 0) *
    (row.hours || 0) *
    (row.rate || 0) *
    (row.coefficient || 1);

  return (
    <div className="grid grid-cols-6 gap-4 mb-2">
      <input
        type="text"
        value={row.role}
        onChange={(e) => onChange(row.id, 'role', e.target.value)}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Role/Task"
      />
      <input
        type="number"
        value={row.people || ''}
        onChange={(e) => onChange(row.id, 'people', Number(e.target.value))}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="People"
        min="0"
      />
      <input
        type="number"
        value={row.hours || ''}
        onChange={(e) => onChange(row.id, 'hours', Number(e.target.value))}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Hours"
        min="0"
      />
      <input
        type="number"
        value={row.rate || ''}
        onChange={(e) => onChange(row.id, 'rate', Number(e.target.value))}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Rate (USD)"
        min="0"
      />
      <input
        type="number"
        value={row.coefficient || ''}
        onChange={(e) =>
          onChange(row.id, 'coefficient', Number(e.target.value))
        }
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Coefficient"
        step="0.1"
        min="0"
      />
      <div className="flex items-center justify-between">
        <span className="font-medium">
          $
          {total.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          onClick={() => onDelete(row.id)}
          className="p-1 text-red-600 hover:text-red-800 transition-colors"
          aria-label="Delete row"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
