export interface EstimateRow {
  id: string;
  role: string;
  people: number;
  hours: number;
  rate: number;
  coefficient: number;
}

export interface EstimateTotal {
  totalAmount: number;
}