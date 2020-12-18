import { Component, OnInit } from '@angular/core';
import { OffertsDataService } from '../offerts-data.service'; //a. Importar el servicio creado en el archivo de servicios

export class Ofertas {
  //_id: string;
  imagen: string;
  descripcion: string;
  nombre: string;
}

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})


export class OfertasComponent implements OnInit {

  constructor(private offertsDataService: OffertsDataService) { } //b. Inyectar el servicio en el componente usado por el constructor
  titulo = 'Ofertas';
  public ofertas: Ofertas[];  // Cambiar la declaración de usuarios, para que no use valores por default
  private getOfferts(): void { // Definir el método getUsers sin parámetros y que no retorne valor
    this.offertsDataService
      .getOfferts() // Llamar al método para obtener los datos
        .then(foundOfferts => this.ofertas= foundOfferts); // Actualiza el arreglo de usuarios con el contenido de la respuesta
  }



  ngOnInit(): void {
    this.getOfferts(); //Permitir la ejecución de getUsers, luego de que el servicio esté disponible
  }

}
