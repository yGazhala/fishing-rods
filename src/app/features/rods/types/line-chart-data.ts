import { LineChartScales } from './line-chart-scales';
import { LineChartDataset } from './line-chart-dataset';

export type LineChartData = {
  xLabels: string[];
  datasets: LineChartDataset[];
  scales?: LineChartScales;
};
