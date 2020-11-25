import { Component, OnInit } from '@angular/core';
//importo el servicio
import { IngredientesdataService } from '../ingredientesdata.service';

export class Ingredientes {
  Imagen: string;
  Nombre: string;
  Precio: number;
}
@Component({
  selector: 'app-admin-listado-ingredientes',
  templateUrl: './admin-listado-ingredientes.component.html',
  styleUrls: ['./admin-listado-ingredientes.component.css']
})
export class AdminListadoIngredientesComponent implements OnInit {

  title = 'Ingrediente';
  //hago disponible el servicio
  constructor(private ingredientesdataService: IngredientesdataService) { }

  /*  ingredientes: Ingredientes = {
      imagen: 'tomate',
      nombre: 'Tomate',
      precio: 0.75
    };
  */

  public ingredientes: Ingredientes;

    
  private getIngrediente(): void {
    
  
    this.ingredientesdataService
      .getIngredientes()
      .then(foundIngredientes => this.ingredientes = foundIngredientes);
  }


  ngOnInit(): void {
    this.getIngrediente();
  }

}
