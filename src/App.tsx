import React, { useState } from 'react';
import { EstimateTable } from './components/EstimateTable';
import { EstimateRow } from './types';

function App() {
  const [projectName, setProjectName] = useState<string>('Project Name');
  const [rows, setRows] = useState<EstimateRow[]>([
    { id: '1', role: '', people: 0, hours: 0, rate: 0, coefficient: 1 },
  ]);

  const handleAddRow = () => {
    const newRow: EstimateRow = {
      id: crypto.randomUUID(),
      role: '',
      people: 0,
      hours: 0,
      rate: 0,
      coefficient: 1,
    };
    setRows([...rows, newRow]);
  };

  const handleUpdateRow = (
    id: string,
    field: keyof EstimateRow,
    value: string | number
  ) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleDeleteRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <EstimateTable
        rows={rows}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        onAddRow={handleAddRow}
        onUpdateRow={handleUpdateRow}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}

export default App;
