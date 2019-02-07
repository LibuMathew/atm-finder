
import { Component, AfterViewInit } from '@angular/core';
import { LocationService } from '../core/location/location.service';
import { DataService } from './../core/data/data.service';

declare var google;

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  constructor(
    private dataService: DataService,
    private locationService: LocationService
  ) { }

  activatePermission() {
    document.getElementById('search-input')['value'] = '';
    this.locationService.invokePermission();
  }

  ngAfterViewInit(): void {
    const input = document.getElementById('search-input');
    const searchBox = new google.maps.places.SearchBox(input);
    const self = this;
    searchBox.addListener('places_changed', function () {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      if (places && places[0]) {
        if (!places[0].geometry) {
          console.log('Returned place contains no geometry');
          return;
        }

        self.dataService.changeMessage({
          type: 'geolocation',
          data: {
            latitude: places[0].geometry.location.lat(),
            longitude: places[0].geometry.location.lng()
          }
        });
      }

    });
  }
}
