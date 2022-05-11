import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalSelecaoComponent } from './profissional-selecao.component';

describe('ProfissionalSelecaoComponent', () => {
  let component: ProfissionalSelecaoComponent;
  let fixture: ComponentFixture<ProfissionalSelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfissionalSelecaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
