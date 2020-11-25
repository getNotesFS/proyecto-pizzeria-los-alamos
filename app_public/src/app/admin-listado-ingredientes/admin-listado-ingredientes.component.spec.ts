import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoIngredientesComponent } from './admin-listado-ingredientes.component';

describe('AdminListadoIngredientesComponent', () => {
  let component: AdminListadoIngredientesComponent;
  let fixture: ComponentFixture<AdminListadoIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListadoIngredientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListadoIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
