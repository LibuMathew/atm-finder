import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationListService {

  constructor(private http: HttpService) { }

  getData(query: any) {
    return this.http.invoke({
      method: 'GET',
      url: 'http://localhost:3001',
      path: 'api/place',
      query: query
    });
  }
}
