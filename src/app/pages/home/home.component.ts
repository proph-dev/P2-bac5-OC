import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicCountry } from '../../core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  public totalJOs: number = 0;
  public totalCountries: number = 0;

  private olympicsSubscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympicsSubscription = this.olympics$.subscribe(data => {
      if (data) {
        this.totalJOs = data.reduce((acc, country) => acc + country.participations.length, 0);
        this.totalCountries = data.length;
      }
    });
  }

  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();
  }
}