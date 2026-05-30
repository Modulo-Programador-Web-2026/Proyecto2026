import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniaForm } from './campania-form';

describe('CampaniaForm', () => {
  let component: CampaniaForm;
  let fixture: ComponentFixture<CampaniaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaniaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaniaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
