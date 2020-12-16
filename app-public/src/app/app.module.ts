import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //3. El modulo HTTPCliente debe estar disponible para toda la app

import { OfertasComponent } from './ofertas/ofertas.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    OfertasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //4. Ahora es un modulo disponible para al aplicacion
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [OfertasComponent]
})
export class AppModule { }
