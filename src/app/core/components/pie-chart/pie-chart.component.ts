import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OlympicCountry } from '../../models/Olympic';
import { Participation } from '../../models/Participation';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  rawData: OlympicCountry[] = [];
  chartData: { name: string, value: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<OlympicCountry[]>('assets/mock/olympic.json').subscribe(data => {
      this.rawData = data;
      this.chartData = this.processData(this.rawData);
    });
  }

  processData(data: OlympicCountry[]) {
      return data.map((country: OlympicCountry) => {
          return {
              name: country.country,
              value: country.participations.reduce((acc: number, curr: Participation) => acc + curr.medalsCount, 0)
          };
      });
  }
}