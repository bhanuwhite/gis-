import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  private data = new Subject<any>();
  public data$ = this.data.asObservable();
  constructor() {}
  sendData(data: any) {
    this.data.next(data);
  }
  sendCoordinatepoint(data: any) {
    this.data.next(data);
  }
}
