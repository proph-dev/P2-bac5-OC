import { Component, Input } from '@angular/core';
import { ChartData, ColorScheme } from '../../../pages/country-details/country-details.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() chartData: ChartData[] = [];
  @Input() colorScheme: ColorScheme = { domain: [] };
}