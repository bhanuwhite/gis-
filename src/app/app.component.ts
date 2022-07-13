import { ChangeDetectorRef, Component } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cursorStyle:any;
  points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  selectedPoint: any;
  title = 'gis-mapbox';
  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be'
  };

  constructor(private ChangeDetectorRef: ChangeDetectorRef) {
    this.points = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
          'icon': 'theatre'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.1, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
          'icon': 'bar'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.2, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
          'icon': 'art-gallery'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.3, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
          'icon': 'bicycle'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.4, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
          'icon': 'star'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.5, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
          'icon': 'music'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.6, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
          'icon': 'music'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.7, 32]
        }
      }, {
        'type': 'Feature',
        'properties': {
          // tslint:disable-next-line:max-line-length
          'description': '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
          'icon': 'music'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [75.8, 32]
        }
      }]
    };
  }

  onClick(evt: MapMouseEvent) {
    this.selectedPoint = null;
    this.ChangeDetectorRef.detectChanges();
    this.selectedPoint = (<any>evt).features[0];
  }

  coordinates = [0, 0];

  onDragStart(event: MapMouseEvent) {
    console.log('onDragStart', event);
  }

  // onDragEnd(event: MapMouseEvent) {
  //   console.log('onDragEnd', event);
  // }
  onDragEnd(marker: Marker) {
    this.coordinates = marker.getLngLat().toArray();
  }

  onDrag(event: MapMouseEvent) {
    console.log('onDrag', event);
    this.coordinates = event.lngLat.toArray();
    console.log(this.coordinates)
  }

  changeColor(color: string) {
    this.layerPaint = { ...this.layerPaint, 'circle-color': color };
  }
}
