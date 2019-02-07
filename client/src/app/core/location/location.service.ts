import { DataService } from '../data/data.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

declare var google;
declare var navigator;

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private snackBar: MatSnackBar,
        private dataService: DataService
    ) {

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by this browser.');
        } else {
            this.invokePermission();
        }
    }

    invokePermission() {
        const self = this;
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            switch (result.state) {
                case 'granted':
                case 'prompt': self.report(result.state);
                navigator.geolocation.getCurrentPosition(self.showPosition);
                    break;
                case 'denied': self.report(result.state);
            }
            result.onchange = function () {
                self.report(result.state);
            };
        });
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2500,
        });
    }


    report(state) {
        console.log('Permission ' + state);
        if (state === 'prompt') {
            this.openSnackBar('Please reload the page to clear location settings!', '');
        }
    }

    showPosition = (position) => {
        this.dataService.changeMessage({
            type: 'geolocation',
            data: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });
    }
}
