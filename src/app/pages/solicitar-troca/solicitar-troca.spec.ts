import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarTroca } from './solicitar-troca';

describe('SolicitarTroca', () => {
  let component: SolicitarTroca;
  let fixture: ComponentFixture<SolicitarTroca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarTroca],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarTroca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
