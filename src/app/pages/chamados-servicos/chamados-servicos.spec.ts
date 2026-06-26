import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosServicos } from './chamados-servicos';

describe('ChamadosServicos', () => {
  let component: ChamadosServicos;
  let fixture: ComponentFixture<ChamadosServicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosServicos],
    }).compileComponents();

    fixture = TestBed.createComponent(ChamadosServicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
