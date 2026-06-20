import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoDetalhes } from './instrumento-detalhes';

describe('InstrumentoDetalhes', () => {
  let component: InstrumentoDetalhes;
  let fixture: ComponentFixture<InstrumentoDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentoDetalhes],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentoDetalhes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
