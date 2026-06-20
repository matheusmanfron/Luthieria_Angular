import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarInstrumento } from './cadastrar-instrumento';

describe('CadastrarInstrumento', () => {
  let component: CadastrarInstrumento;
  let fixture: ComponentFixture<CadastrarInstrumento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarInstrumento],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarInstrumento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
