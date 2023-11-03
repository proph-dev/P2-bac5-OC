import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PieChartComponent } from './core/components/pie-chart/pie-chart.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { LineChartComponent } from './core/components/line-chart/line-chart.component';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent, CountryDetailsComponent, LineChartComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
