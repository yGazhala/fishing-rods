import { LineChartData } from '../../types/line-chart-data';
import { Advertisement } from '../../../../types/advertisement';
import { CurrencyCode } from '../../../../types/currency-code';
import { advertisementsToMonthPrices } from './advertisements-to-month-prices';
import { LineChartDataset } from '../../types/line-chart-dataset';
import { getLineChartScalesForDatasets } from './get-line-chart-scales-for-datasets';

export const advertisementsToPriceLineChartData = (
  advertisementsInDescOrder: Advertisement[],
  currency: CurrencyCode,
): LineChartData | undefined => {
  const pricesByMonths = advertisementsToMonthPrices(advertisementsInDescOrder, currency);

  if (pricesByMonths.length <= 1) {
    return undefined;
  }

  const datasets: LineChartDataset[] = [
    {
      label: 'New rod',
      data: pricesByMonths.map((month) => month.newRodAveragePrice),
      borderColor: 'rgb(255, 159, 64)', // Orange
    },
    {
      label: 'Used rod',
      data: pricesByMonths.map((month) => month.usedRodAveragePrice),
      borderColor: 'rgb(54, 162, 235)', // Blue
    },
  ];

  return {
    xLabels: pricesByMonths.map((month) => month.monthLabel),
    datasets,
    scales: getLineChartScalesForDatasets(datasets),
  };
};
