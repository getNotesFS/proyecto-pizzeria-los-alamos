import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffertsComponent } from './offerts/offerts.component';
//import { NgFallimgModule} from 'ng-fallimg';

@NgModule({
  declarations: [
    OffertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    /*NgFallimgModule.forRoot({
      default: '/assets/LogoLA2.png'
    })*/
  ],
  providers: [],
  bootstrap: [OffertsComponent] //este es el inicio el landing space
})
export class AppModule { }
