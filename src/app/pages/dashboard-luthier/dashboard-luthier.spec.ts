import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLuthier } from './dashboard-luthier';

describe('DashboardLuthier', () => {
  let component: DashboardLuthier;
  let fixture: ComponentFixture<DashboardLuthier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLuthier],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLuthier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
