import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseData} from '../models/data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly BaseUrl = 'https://api.covid19api.com/summary'
  constructor(private http: HttpClient) { }

  get<T>(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.BaseUrl);
  }
}
