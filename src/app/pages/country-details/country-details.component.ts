import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

export interface ChartData {
  name: string;
  series: { name: string; value: number }[];
}

export interface ColorScheme {
  domain: string[];
}

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  countryData: OlympicCountry | undefined;
  chartData: ChartData[] = [];
  colorScheme: ColorScheme = {
    domain: ['#04838f']
  };

  entries!: number;
  totalAthletes!: number;
  totalEarnedMedals!: number;

  private httpSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }

  loadData(): void {
    const subscription = this.http.get<OlympicCountry[]>('assets/mock/olympic.json').subscribe(data => {
      const countryName = this.route.snapshot.paramMap.get('countryName');
      this.countryData = data.find(country => country.country === countryName);

      // Créer les données pour le diagramme linéaire
      if (this.countryData) {
        this.chartData = [
          {
            name: this.countryData.country,
            series: this.countryData.participations.map((participation: Participation) => ({
              name: participation.year.toString(),
              value: participation.medalsCount
            }))
          }
        ];

        this.setOtherInfosData();
      }
    });

    this.httpSubscription.add(subscription);
  }

  setOtherInfosData(): void {
    if (this.countryData) {
      this.entries = this.countryData.participations.length;

      this.totalEarnedMedals = this.countryData.participations.reduce((acc, cur) => acc + cur.medalsCount, 0);

      this.totalAthletes = this.countryData.participations.reduce((acc, cur) => acc + cur.athleteCount, 0);
    }
  }
}