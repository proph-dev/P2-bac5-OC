import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OlympicCountry } from '../../models/Olympic';
import { Participation } from '../../models/Participation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  rawData: OlympicCountry[] = [];
  chartData: { name: string, value: number }[] = [];

  private httpSubscription?: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  loadData(): void {
    this.http.get<OlympicCountry[]>('assets/mock/olympic.json').subscribe(data => {
      this.rawData = data;
      this.chartData = this.processData(this.rawData);
    });
  }

  processData(data: OlympicCountry[]): { name: string, value: number }[] {
    return data.map((country: OlympicCountry) => {
        return {
            name: country.country,
            value: country.participations.reduce((acc: number, curr: Participation) => acc + curr.medalsCount, 0)
        };
    });
  }

  onCountrySelect(event: { name: string, value: number }): void {
    this.router.navigate(['/country-details', event.name]);
  }
}