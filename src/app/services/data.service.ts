import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Data, GlobalData, ResponseData} from '../models/data';
import {map, take, tap} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpService,
              private alertBar: AlertService) {
  }
  getData(): Observable<Data[]> {
    return this.http.get<ResponseData>().pipe(
      map(res => res.Countries),
      tap((res) => {
        console.log('[Data]', res);
      }, e => {
        console.log(e);
        // this.alertBar.error(e.message);
      })
    );
  }
  getGlobalData(): Observable<GlobalData> {
    return this.http.get<ResponseData>().pipe(
      take(1),
      map(res => res.Global),
      tap((res) => {
        console.log('[Global]', res);
      }, e => {
        console.log(e);
        // this.alertBar.error(e.message);
      })
    );
  }
}
