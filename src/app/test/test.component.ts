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
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.038659, 38.931567],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.003168, 38.894651],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.090372, 38.881189],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.111561, 38.882342],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.052477, 38.943951],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.043444, 38.909664],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.031706, 38.914581],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.020945, 38.878241],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.007481, 38.876516],
              },
            },
          ],
        },
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
    });
  }
}
