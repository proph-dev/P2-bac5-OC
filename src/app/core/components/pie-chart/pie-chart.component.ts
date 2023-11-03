import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicCountry } from '../../models/Olympic';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  rawData: OlympicCountry[] = [];
  chartData: { name: string, value: number }[] = [];

  private subscription = new Subscription();

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    const subscription = this.olympicService.getOlympics().subscribe(data => {
      this.rawData = data;
      this.chartData = this.processData(this.rawData);
    });

    this.subscription.add(subscription);
  }

  processData(data: OlympicCountry[]): { name: string, value: number }[] {
    return data.map((country: OlympicCountry) => {
        return {
            name: country.country,
            value: country.participations.reduce((acc, curr) => acc + curr.medalsCount, 0)
        };
    });
  }

  onCountrySelect(event: { name: string, value: number }): void {
    this.router.navigate(['/country-details', event.name]);
  }
}