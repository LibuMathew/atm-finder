
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { HttpService } from './http/http.service';
import { DataService } from './data/data.service';
import { LocationService } from './location/location.service';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule
    ],
    providers: [
        HttpService,
        DataService,
        LocationService
    ]
})
export class CoreModule { }
