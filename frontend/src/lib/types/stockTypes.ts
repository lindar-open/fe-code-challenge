export type Bias = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export type TrendType = 'UP' | 'DOWN' | null;

export interface PricesState {
  [key: string]: number;
}