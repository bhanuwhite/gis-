import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }

  get(url: string):Observable<any>{
    return this.http.get(url);
  }
  
  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=place&access_token='
    + environment.mapbox.accessToken)
    .pipe(map((res: any) => {
      return res.features;
    }));
  }

}
