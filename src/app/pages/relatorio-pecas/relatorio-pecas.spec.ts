import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPecas } from './relatorio-pecas';

describe('RelatorioPecas', () => {
  let component: RelatorioPecas;
  let fixture: ComponentFixture<RelatorioPecas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPecas],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioPecas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
