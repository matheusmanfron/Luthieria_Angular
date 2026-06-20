import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarConserto } from './solicitar-conserto';

describe('SolicitarConserto', () => {
  let component: SolicitarConserto;
  let fixture: ComponentFixture<SolicitarConserto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarConserto],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarConserto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
