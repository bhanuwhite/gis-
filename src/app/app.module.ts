import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { APIService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './module/header/header.component';
import { LayoutComponent } from './module/layout/layout.component';
import { TestComponent } from './test/test.component';
import { GsMapComponent } from './gs-map/gs-map.component';
// import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AuthComponent,
    HeaderComponent,
    LayoutComponent,
    TestComponent,
    GsMapComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    // DropdownModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiaGJoamhzIiwiYSI6ImNsNWo3ZGNhODBmODAzY3BqODhuejB3ZmoifQ.RqsEoPXFgDUq1mryoReotg',
    }),
  ],
  providers: [APIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
