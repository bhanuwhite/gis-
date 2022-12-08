import { Component, OnInit } from '@angular/core';
import { HeaderServiceService } from '../header-service.service';
import * as jsonData from '../../../assets/points.json';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // points: any;
  addresses: string[] = [];
  selectedAddress = '';
  coordinatesPoint: any = [78.48, 17.38];
  constructor(
    private heaaderservice: HeaderServiceService,
    public route: Router,
    private APIService: APIService
  ) {
    // this.points = jsonData;
  }
  ngOnInit(): void {
    // this.getLocalLocation();
  }

  onselectOption(event: any) {
    console.log(event.target.value);
    switch (event.target.value) {
      case 'bar':
        this.heaaderservice.sendData([86.528876, 21.5152]);
        break;
      case 'theatre':
        this.heaaderservice.sendData([75.1, 32]);
        break;
      case 'music':
        this.heaaderservice.sendData([85.839452, 20.260296]);
        break;
      case 'art':
        this.heaaderservice.sendData([75.3, 32]);
        break;
    }
  }
  signout() {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }
  apiCallForLocation(loc: any) {
    this.APIService.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoiaGJoamhzIiwiYSI6ImNsNWo3ZGNhODBmODAzY3BqODhuejB3ZmoifQ.RqsEoPXFgDUq1mryoReotg`
    ).subscribe((res) => {
      this.coordinatesPoint = res['features'][0]['geometry']['coordinates'];
      this.heaaderservice.sendCoordinatepoint(this.coordinatesPoint);
    });
  }

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
    console.log(address);

    this.selectedAddress = address;
    this.addresses = [];
    this.apiCallForLocation(this.selectedAddress);
  }
  // clearSearch(){
  //   document.getElementById('searchbar')
  // }
}
