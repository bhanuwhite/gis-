import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { environment } from 'src/environments/environment';

import { MapMouseEvent } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';

import * as jsonData from '../../assets/points.json';
import { APIService } from '../api.service';
import { HeaderServiceService } from '../module/header-service.service';
import * as Notiflix from 'notiflix';
import * as turf from '@turf/distance';
@Component({
  selector: 'app-gs-map',
  templateUrl: './gs-map.component.html',
  styleUrls: ['./gs-map.component.scss'],
})
export class GsMapComponent implements OnInit {
  map: any = {};
  // Initialize the GeolocateControl.
  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });
  style = 'mapbox://styles/mapbox/streets-v12';
  coordinatePoint = [-78.880453, 42.897852];
  zoom: number = 13;
  constructor(private heaaderservice: HeaderServiceService) {
    mapboxgl!.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.mapBox();
    this.map.addControl(this.geolocate);
    console.log(this.geolocate);

    this.heaaderservice.data$.subscribe((data) => {
      Notiflix.Loading.remove;
      console.log(data);
      if (data !== '') {
        this.coordinatePoint = data;
        this.zoom = 8;
        this.mapBox();
      }
    });
    this.liveLocation();
  }
  mapBox() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.coordinatePoint[0], this.coordinatePoint[1]],
    });
  }

  liveLocation() {
    this.map.on('load', () => {
      this.geolocate.trigger();
    });
    console.log(this.geolocate);
  }
  mapLoad() {}
}
