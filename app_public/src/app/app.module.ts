import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //importar el HTTPCLIENT para toda la aplicación

//import { AppComponent } from './app.component';
import { AdminListadoIngredientesComponent } from './admin-listado-ingredientes/admin-listado-ingredientes.component';

@NgModule({
  declarations: [
   
    AdminListadoIngredientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AdminListadoIngredientesComponent]
})
export class AppModule { }
