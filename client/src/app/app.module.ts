import { LocationListService } from './common/location-list/location-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationListComponent } from './locations/location-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RaterComponentComponent } from './common/rater-component/rater-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationListComponent,
    RaterComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LocationListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
