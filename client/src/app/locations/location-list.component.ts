
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationListService } from './../common/location-list/location-list.service';
import { DataService } from '../core/data/data.service';
import { IMessageType } from './../core/data/data';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations = [];
  errorMessage: any = '';
  isLoading = false;

  constructor(
    private dataService: DataService,
    private locationListService: LocationListService,
    private cd: ChangeDetectorRef
  ) { }

  private invokeFilterEvent(locations) {
    this.dataService.changeMessage({
      type: 'filtered-locations',
      data: {
        locations: locations
      }
    });
  }

  private getPlaces(message: IMessageType) {
    this.locations = [];
    this.isLoading = true;
    this.locationListService.getData(message.data).subscribe(
      response => {
        if (response.success) {
          this.locations = response.body['results'];
        } else {
          this.errorMessage = response['error'];
        }
        this.isLoading = false;
        this.invokeFilterEvent(this.locations);
        this.cd.detectChanges();
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      if (message.type === 'geolocation') {
        this.getPlaces(message);
      }
    });
  }
}
