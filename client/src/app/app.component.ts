import { DataService } from './core/data/data.service';

import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked, OnInit } from '@angular/core';
import { LocationListComponent } from './locations/location-list.component';

declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'Google Place v1.0.0';
  _isLoading = false;
  @ViewChild(LocationListComponent) locationListChild: LocationListComponent;
  locations = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dataService: DataService
  ) { }

  private getLocations(locations) {
    if (locations) {
      this.locations = [];
      locations.map(location => {
        const geometry = location.geometry.location;
        this.locations.push([
          `${location.name}, ${location.vicinity}`,
          geometry.lat,
          geometry.lng
        ]);
      });
    }
    this.initMap();
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      if (message.type === 'filtered-locations') {
        this.getLocations(message.data['locations']);
      }
    });
  }

  ngAfterViewChecked() {
    this._isLoading = this.locationListChild.isLoading;
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() { }

  initMap() {
    if (this.locations.length > 0) {
      const lat = this.locations[0][1];
      const lng = this.locations[0][2];
      const center = { lat: lat, lng: lng };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center
      });
      const infowindow = new google.maps.InfoWindow({});
      let marker, count;
      for (count = 0; count < this.locations.length; count++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations[count][1], this.locations[count][2]),
          map: map,
          title: this.locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
          return function () {
            infowindow.setContent(this.locations[count][0]);
            infowindow.open(map, marker);
          };
        })(marker, count));
      }
    }
  }
}
