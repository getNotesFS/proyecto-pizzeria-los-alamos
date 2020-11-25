import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredientes } from './admin-listado-ingredientes/admin-listado-ingredientes.component';

@Injectable({
  providedIn: 'root'
})
export class IngredientesdataService {

  constructor(private http: HttpClient) { }
  //inyectar el servicio de HttpCliente dentro de nuestro servicio

  //apI url 
  private apiBaseUrl = 'http://localhost:3000/api/ingredientes';

  //método público, agregar [] si quiere devolver colección
  public getIngredientes(): Promise<Ingredientes> {
    const codigo: string = '5fae5ce153d4970814e75dff';

    const url: string = `${this.apiBaseUrl}/${codigo}`; 
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Ingredientes)
      .catch(this.handleError);
   
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}