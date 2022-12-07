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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  map: any = {};
  title = 'gis-mapbox';
  style = 'mapbox://styles/mapbox/streets-v12';

  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be',
  };
  coordinatesPoint: any[] = [86.528876, 21.5152];
  points: any;
  // lat = -78.880453;
  // lang = 42.897852;

  constructor(private heaaderservice: HeaderServiceService) {
    mapboxgl!.accessToken = environment.mapbox.accessToken;
    this.points = jsonData;
  }

  ngOnInit(): void {
    this.heaaderservice.data$.subscribe((data) => {
      console.log(data);
      if (data !== '') {
        this.coordinatesPoint = data;
        this.mapBox();
      }
    });
    this.mapBox();
  }
  mapBox(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,

      center: [this.coordinatesPoint[0], this.coordinatesPoint[1]],
    });
    new mapboxgl.Marker()
      .setLngLat([this.coordinatesPoint[0], this.coordinatesPoint[1]])
      .addTo(this.map);
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
      console.log(x.features);
      // updateArea() {
      if (x.features[0].geometry.coordinates.length === 2) {
        var from = (window as any).turf.point(
          x.features[0].geometry.coordinates[0]
        );
        var to = (window as any).turf.point(
          x.features[0].geometry.coordinates[1]
        );
        var options = { units: 'kilometers' };

        var distance = (window as any).turf.distance(from, to, options);
        console.log(distance);
        Notiflix.Report.info(
          'Distance',
          `Total distance from ${x.features[0].geometry.coordinates[0]} to ${x.features[0].geometry.coordinates[1]} is ${distance} Kilometer`,
          'Ok'
        );
      } else {
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
      }
    });
  }
  drawPolygonalJson(cordinates: any, id: any) {
    console.log(cordinates, id, 'function');

    this.map.on('load', () => {
      this.map.addSource('places', {
        type: 'geojson',
        data: jsonData,
      });
      // Add a layer showing the places.
      this.map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
      this.map.on('mouseenter', 'places', (e: any) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      });

      this.map.on('mouseleave', 'places', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
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
      // this.map.addLayer({
      //   id: id,
      //   type: 'fill',
      //   source: id, // reference the data source
      //   layout: {},
      //   paint: {
      //     'fill-color': '#0080ff', // blue color fill
      //     'fill-opacity': 0.5,
      //   },
      // });
      // // Add a black outline around the polygon.
      // this.map.addLayer({
      //   id: 'outline',
      //   type: 'line',
      //   source: id,
      //   layout: {},
      //   paint: {
      //     'line-color': '#000',
      //     'line-width': 3,
      //   },
      // });
    });
  }
}
