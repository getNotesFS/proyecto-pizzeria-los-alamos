import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';//1. Importar el servicio HTTP dentro del archivo de servicios
import { Ofertas } from './ofertas/ofertas.component'; //6. Importar la clase Ofertas

@Injectable({
  providedIn: 'root'
})
export class OffertsDataService {

  constructor(private http: HttpClient) { } //2.Inyectar el servicio HTTPClient dentro de nuestro servicio
  
  private apiBaseUrl = 'http://localhost:3000/api/ofertas';

  //5. Metodo Publico para que el componente pueda llamarlo. Devuelve una Promesa (devuelve todo lo que esta en la base de datos)
  public getOfferts(): Promise<Ofertas[]> {


    //const codigo: string = '5fd9c4863c7a6b283833ccc1'; //id   /${codigo}
    const url: string = `${this.apiBaseUrl}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Ofertas[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error en la lectura de ofertas', error);
    return Promise.reject(error.message || error);
  }
}
