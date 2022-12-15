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
  coord: any = sessionStorage.getItem('cordnate');
  title = 'gis-mapbox';
  style = 'mapbox://styles/mapbox/streets-v12';
  tempData: any = jsonData;
  zoom: number = 8;
  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be',
  };
  coordinatesPoint: any[] = [];
  points: any;
  // lat = -78.880453;
  // lang = 42.897852;

  constructor(private heaaderservice: HeaderServiceService) {
    mapboxgl!.accessToken = environment.mapbox.accessToken;
    this.points = jsonData;
  }

  ngOnInit(): void {
    // Notiflix.Loading.hourglass();
    this.heaaderservice.data$.subscribe((data) => {
      Notiflix.Loading.remove;
      console.log(data);
      if (data !== '') {
        this.coordinatesPoint = data;
        this.zoom = 12;
        this.mapBox();
      }
    });

    console.log(JSON.parse(this.coord));
    this.coordinatesPoint = JSON.parse(this.coord);
    console.log(this.coordinatesPoint);
    this.mapBox();
  }
  mapBox() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.coordinatesPoint[0], this.coordinatesPoint[1]],
    });
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    // Add markers to the map.
    for (const marker of this.tempData.features) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url(${marker.properties.image})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';
      el.addEventListener('mouseenter', () => {
        // window.alert(marker.properties.message);
        popup
          .setLngLat(marker.geometry.coordinates)
          .setHTML(marker.properties.message)
          .addTo(this.map);
      });
      el.addEventListener('mouseleave', () => {
        // window.alert(marker.properties.message);
        popup.remove();
      });
      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    }
    // new mapboxgl.Marker(el)
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

    // this.map.on('load', () => {

    // });
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
          `Total distance from ${parseFloat(
            x.features[0].geometry.coordinates[0]
          ).toFixed(2)} to ${parseFloat(
            x.features[0].geometry.coordinates[0]
          ).toFixed(2)} is ${parseFloat(distance).toFixed(2)} Kilometer`,
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
    // console.log(cordinates, id, 'function');
    // let geolocate = new mapboxgl.GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true,
    //   },
    //   trackUserLocation: true,
    // });
    // this.map.addControl(geolocate);

    this.map.on('load', () => {
      // this.map.addSource('point', {
      //   type: 'geojson',
      //   data: jsonData,
      // });
      // geolocate.trigger();
      // for(let i=0;i>jsonData.length)
      console.log(this.tempData.features);

      // this.map.loadImage(
      //   '../../assets/images/global.png',
      //   // '../../assets/images/global.png',
      //   // '../../assets/images/global.png',
      //   (error: any, image: any) => {
      //     if (error) throw error;
      //     console.log(image);
      //     // Add the image to the map style.
      //     // for (let i = 0; i > this.tempData.features.length; i++) {
      //     this.map.addImage('cat', image);
      //     // this.map.addImage('cat', image);
      //     // }
      //     // Add a layer showing the places.
      //     // this.map.on('load', 'Points', (e: any) => {
      //     this.map.addLayer({
      //       id: 'Points',
      //       type: 'symbol',
      //       source: 'point',
      //       layout: {
      //         'icon-image': 'cat', // reference the image
      //         'icon-size': 0.05,
      //       },
      //       // id: 'Points',
      //       // type: 'circle',
      //       // source: 'point',
      //       // paint: {
      //       //   'circle-color': 'red',
      //       //   'circle-radius': 8,
      //       //   'circle-stroke-width': 2,
      //       //   'circle-stroke-color': '#ffffff',
      //       // },
      //     });
      //   }
      // );

      // const popup = new mapboxgl.Popup({
      //   closeButton: false,
      //   closeOnClick: false,
      // });

      // this.map.on('mouseenter', 'Points', (e: any) => {
      //   console.log(e.features[0].properties.description, 'hiii');
      //   // Change the cursor style as a UI indicator.
      //   this.map.getCanvas().style.cursor = 'pointer';

      //   // Copy coordinates array.
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   const description = e.features[0].properties.description;

      //   // Ensure that if the map is zoomed out such that multiple
      //   // copies of the feature are visible, the popup appears
      //   // over the copy being pointed to.
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }

      //   // Populate the popup and set its coordinates
      //   // based on the feature found.
      //   popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      // });

      // this.map.on('mouseleave', 'Points', () => {
      //   this.map.getCanvas().style.cursor = '';
      //   popup.remove();
      // });
      this.map.addSource(id, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: cordinates,
          },
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
      // // Add a black outline around the polygon.
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
