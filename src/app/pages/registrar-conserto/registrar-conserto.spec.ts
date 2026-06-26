import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConserto } from './registrar-conserto';

describe('RegistrarConserto', () => {
  let component: RegistrarConserto;
  let fixture: ComponentFixture<RegistrarConserto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarConserto],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarConserto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
