import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from "ngx-mapbox-gl";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        "pk.eyJ1IjoiaGJoamhzIiwiYSI6ImNsNWo3ZGNhODBmODAzY3BqODhuejB3ZmoifQ.RqsEoPXFgDUq1mryoReotg"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
