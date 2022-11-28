import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // cursorStyle: any;
  // points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  // selectedPoint: any;
  // title = 'gis-mapbox';
  // layerPaint = {
  //   'circle-radius': 10,
  //   'circle-color': '#3887be',
  // };

  // options: any = {
  //   types: [],
  //   // componentRestrictions: { country: 'UA' }
  // };

  // location: any;
  // coordinatesPoint: any = [78.48, 17.38];

  // @ViewChild("placesRef") placesRef: GooglePlaceDirective[] = [];

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private APIService: APIService
  ) {}

  // public handleAddressChange(address: Address) {
  //   this.location = address.formatted_address;
  //   this.apiCallForLocation(this.location)
  //   console.log(address)
  //   // Do some stuff
  // }
}
