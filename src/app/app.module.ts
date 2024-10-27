import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { UtilServiceService } from './service/util-service.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LocalStorageModule.forRoot({
      prefix: 'dash-admin',
      storageType: 'localStorage'
    })
    ,
    BrowserAnimationsModule
  ],
  providers: [
    UtilServiceService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    NgModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
