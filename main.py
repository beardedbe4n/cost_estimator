from decimal import Decimal
from typing import List, Dict
import json
import uuid
import csv
from datetime import datetime

class EstimateRow:
    def __init__(
        self,
        role: str = "",
        people: int = 0,
        hours: float = 0,
        rate: float = 0,
        coefficient: float = 1
    ):
        self.id = str(uuid.uuid4())
        self.role = role
        self.people = people
        self.hours = hours
        self.rate = rate
        self.coefficient = coefficient

    def calculate_total(self) -> Decimal:
        return Decimal(str(self.people * self.hours * self.rate * self.coefficient))

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "role": self.role,
            "people": self.people,
            "hours": self.hours,
            "rate": self.rate,
            "coefficient": self.coefficient,
            "total": float(self.calculate_total())
        }

class CostEstimate:
    def __init__(self, project_name: str = "Cost Estimate"):
        self.project_name = project_name
        self.rows: List[EstimateRow] = []

    def add_row(self) -> EstimateRow:
        row = EstimateRow()
        self.rows.append(row)
        return row

    def update_row(self, row_id: str, field: str, value: any) -> bool:
        for row in self.rows:
            if row.id == row_id:
                setattr(row, field, value)
                return True
        return False

    def delete_row(self, row_id: str) -> bool:
        self.rows = [row for row in self.rows if row.id != row_id]
        return True

    def calculate_total(self) -> Decimal:
        return sum(row.calculate_total() for row in self.rows)

    def export_to_csv(self, filename: str = None) -> str:
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{self.project_name.replace(' ', '_')}_{timestamp}.csv"

        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['Role/Task', 'People', 'Hours', 'Rate (USD)', 'Coefficient', 'Total']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for row in self.rows:
                writer.writerow({
                    'Role/Task': row.role,
                    'People': row.people,
                    'Hours': row.hours,
                    'Rate (USD)': row.rate,
                    'Coefficient': row.coefficient,
                    'Total': float(row.calculate_total())
                })
            writer.writerow({
                'Role/Task': 'TOTAL',
                'Total': float(self.calculate_total())
            })
        
        return filename

    def to_json(self) -> str:
        return json.dumps({
            "project_name": self.project_name,
            "rows": [row.to_dict() for row in self.rows],
            "total": float(self.calculate_total())
        }, indent=2)