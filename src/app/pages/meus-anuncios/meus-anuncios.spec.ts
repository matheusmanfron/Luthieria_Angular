import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusAnuncios } from './meus-anuncios';

describe('MeusAnuncios', () => {
  let component: MeusAnuncios;
  let fixture: ComponentFixture<MeusAnuncios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusAnuncios],
    }).compileComponents();

    fixture = TestBed.createComponent(MeusAnuncios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
