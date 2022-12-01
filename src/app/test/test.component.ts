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

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  map: any = {};
  title = 'gis-mapbox';
  style = 'mapbox://styles/mapbox/streets-v11';
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [60, 60],
        },
        geometry: {
          type: 'Point',
          coordinates1: [-66.324462, -16.024695],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates1: [-61.21582, -15.971891],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [40, 40],
        },
        geometry: {
          type: 'Point',
          coordinates1: [-63.292236, -18.281518],
        },
      },
    ],
  };

  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be',
  };
  coordinatesPoint: any[] = [-77.31373744962319, 45.22121694402196];
  points: any;
  // lat = -78.880453;
  // lang = 42.897852;

  constructor(private heaaderservice: HeaderServiceService) {
    this.points = jsonData;
  }

  ngOnInit(): void {
    mapboxgl!.accessToken = environment.mapbox.accessToken;
    this.heaaderservice.data$.subscribe((data) => {
      console.log(data);
      if (data !== '') {
        this.coordinatesPoint = data;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 9,
          center: [this.coordinatesPoint[0], this.coordinatesPoint[1]],
        });
        new mapboxgl.Marker()
          .setLngLat([this.coordinatesPoint[0], this.coordinatesPoint[1]])
          .addTo(this.map);
      }
      // console.log(this.map.target);
    });
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 9,
      center: [this.coordinatesPoint[0], this.coordinatesPoint[1]],
    });
    // Create a marker and add it to the map.
    let array = [
      [
        [-77.31373744962319, 45.22121694402196],
        [-75.50954454630086, 46.17328712652693],
        [-74.02609704801303, 44.08037594258744],
        [-77.31373744962319, 45.22121694402196],
      ],
      [
        [-70.31373744962319, 45.22121694402196],
        [-70.50954454630086, 46.17328712652693],
        [-70.02609704801303, 44.08037594258744],
        [-70.31373744962319, 45.22121694402196],
      ],
    ];
    this.drawPolygonalJson(array, 'maine');
    let Draw = new MapboxDraw();
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(Draw);

    this.map.on('draw.create', (x: any) => {
      console.log(x.features[0].geometry.coordinates);

      this.drawPolygonalJson(
        x.features[0].geometry.coordinates,
        x.features[0].id
      );
      Notiflix.Confirm.prompt(
        'Polygon',
        'Enter Proper Name',
        '',
        'Ok',
        'Cancel',
        function okCb(clientAnswer) {
          // array.push(x.features[0].geometry.coordinates);
          Notiflix.Report.success(
            clientAnswer,
            x.features[0].geometry.coordinates.join(''),
            'ok'
          );
          console.log(x.features[0].geometry.coordinates);
        },
        function cancelCb(clientAnswer) {
          // console.log('Client answer was: ' + clientAnswer);
        },
        {
          // Custom options
        }
      );
    });
  }
  drawPolygonalJson(cordinates: any, id: any) {
    console.log(cordinates, id, 'function');

    this.map.on('load', () => {
      this.map.addSource(id, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            // These coordinates outline Maine.
            coordinates: cordinates,
          },
        },
        // data: jsonData,
      });
      // ALL YOUR APPLICATION CODE
      // Add a new layer to visualize the polygon.
      this.map.addLayer({
        id: id,
        type: 'fill',
        source: id, // reference the data source
        layout: {},
        paint: {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5,
        },
      });
      // Add a black outline around the polygon.
      this.map.addLayer({
        id: 'outline',
        type: 'line',
        source: id,
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
      for (let marker of this.geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        let markercord: any = marker.geometry.coordinates1;
        new mapboxgl.Marker(el).setLngLat(markercord).addTo(this.map);
        // el.addEventListener('click', () => {
        //   window.alert(marker.properties.message);
        // });
        console.log(markercord);

        // Add markers to the map.
      }
      // this.map.addLayer({
      //   id: 'places',
      //   type: 'symbol',
      //   source: 'places',
      //   layout: {
      //     'icon-image': '{icon}',
      //     'icon-allow-overlap': true,
      //   },
      // });
    });
  }
}