import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RodPriceStatisticsStore } from '../../services/rod-price-statistics.store';
import { LineChart } from '../../components/line-chart/line-chart';
import { getCurrencyOptions } from '../../../../utils/get-currency-options';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { CurrencyCode } from '../../../../types/currency-code';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-rod-price-statistics',
  imports: [LineChart, MatTabGroup, MatTab, PricePipe],
  templateUrl: './rod-price-statistics.html',
  styleUrl: './rod-price-statistics.scss',
  providers: [RodPriceStatisticsStore],
})
export class RodPriceStatistics implements OnInit {
  public rodId = input.required<string>();

  protected stats = inject(RodPriceStatisticsStore);
  protected currencyTabs = getCurrencyOptions();

  protected selectedCurrencyTabIndex = computed(() => {
    const selectedCurrency = this.stats.selectedCurrency();
    const index = this.currencyTabs.findIndex((option) => option.value === selectedCurrency);
    return index >= 0 ? index : 0;
  });

  public ngOnInit(): void {
    const rodId = this.rodId();
    this.stats.loadPriceLineChartData(rodId);
    this.stats.loadPriceStatisticsSummary(rodId);
  }

  protected setCurrency(event: MatTabChangeEvent): void {
    this.stats.setCurrency(event.tab.id as CurrencyCode);
  }
}
