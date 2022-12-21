import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
// import * as jsonData from '../../assets/points.json';
import { APIService } from '../api.service';
import { HeaderServiceService } from '../module/header-service.service';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  cursorStyle: any;
  points: any;
  selectedPoint: any;
  title = 'gis-mapbox';
  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be',
  };

  options: any = {
    types: [],
    // componentRestrictions: { country: 'UA' }
  };

  location: any;
  coordinatesPoint: any = [78.48, 17.38];

  // @ViewChild("placesRef") placesRef: GooglePlaceDirective[] = [];

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private APIService: APIService,
    private heaaderservice: HeaderServiceService
  ) {
    // this.points = jsonData;
    // const map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //   // style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    //   center: [-91.874, 42.76], // starting position [lng, lat]
    //   zoom: 12, // starting zoom
    // });
    // const draw = new MapboxDraw({
    //   displayControlsDefault: false,
    //   // Select which mapbox-gl-draw control buttons to add to the map.
    //   controls: {
    //     polygon: true,
    //     trash: true,
    //   },
    //   // Set mapbox-gl-draw to draw by default.
    //   // The user does not have to click the polygon control button first.
    //   defaultMode: 'draw_polygon',
    // });
    // map.addControl(draw);
  }
  ngOnInit(): void {
    this.heaaderservice.data$.subscribe((data) => {
      console.log(data);
      if (data !== '') {
        this.coordinatesPoint = data;
      }
    });
  }

  // public handleAddressChange(address: Address) {
  //   this.location = address.formatted_address;
  //   this.apiCallForLocation(this.location)
  //   console.log(address)
  //   // Do some stuff
  // }

  apiCallForLocation(loc: any) {
    this.APIService.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoiaGJoamhzIiwiYSI6ImNsNWo3ZGNhODBmODAzY3BqODhuejB3ZmoifQ.RqsEoPXFgDUq1mryoReotg`
    ).subscribe((res) => {
      this.coordinatesPoint = res['features'][0]['geometry']['coordinates'];
    });
  }

  onClick(evt: MapMouseEvent) {
    this.selectedPoint = null;
    this.ChangeDetectorRef.detectChanges();
    this.selectedPoint = (<any>evt).features[0];
  }

  onDragStart(event: MapMouseEvent) {
    console.log('onDragStart', event);
  }

  onDragEnd(marker: Marker) {
    this.coordinatesPoint = marker.getLngLat().toArray();
  }

  onDrag(event: MapMouseEvent) {
    console.log('onDrag', event);
    this.coordinatesPoint = event.lngLat.toArray();
    // console.log(this.coordinatesPoint)
  }

  changeColor(color: string) {
    this.layerPaint = { ...this.layerPaint, 'circle-color': color };
  }

  addresses: string[] = [];
  selectedAddress = '';

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.APIService.search_word(searchTerm).subscribe((features: any) => {
        this.addresses = features.map((feat: any) => feat.place_name);
      });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string) {
    this.selectedAddress = address;
    this.addresses = [];
    this.apiCallForLocation(this.selectedAddress);
  }
}
