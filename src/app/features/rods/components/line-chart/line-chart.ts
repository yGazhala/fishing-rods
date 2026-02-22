import { AfterViewInit, Component, input, ElementRef, viewChild, computed } from '@angular/core';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';
import { LineChartData } from '../../types/line-chart-data';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CurrencyCode } from '../../../../types/currency-code';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
})
export class LineChart implements AfterViewInit {
  public data = input.required<LineChartData>();
  public currency = input.required<CurrencyCode>();

  private canvasRef = viewChild<ElementRef>('canvas');
  private chart: any;

  private libraryChartData = computed(() => {
    const source = this.data();
    const result: ChartData = {
      xLabels: source.xLabels,
      datasets: [],
    };
    source.datasets.forEach((dataset) => {
      result.datasets.push({
        ...dataset,
        tension: 0.3,
      });
    });

    return result;
  });

  private onDataChange = toObservable(this.libraryChartData)
    .pipe(takeUntilDestroyed())
    .subscribe((chartData) => {
      if (chartData && this.chart) {
        this.chart.destroy();
        this.createChart(this.canvasRef()?.nativeElement);
      }
    });

  public ngAfterViewInit(): void {
    this.createChart(this.canvasRef()?.nativeElement);
  }

  private createChart(canvasElement: HTMLCanvasElement): void {
    const config: ChartConfiguration = {
      type: 'line',
      data: this.libraryChartData(),
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            align: 'end',
          },
          title: {
            display: false,
          },
        },
        scales: this.data().scales,
      },
    };
    this.chart = new Chart(canvasElement, config);
  }
}
