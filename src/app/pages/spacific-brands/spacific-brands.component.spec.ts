import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacificBrandsComponent } from './spacific-brands.component';

describe('SpacificBrandsComponent', () => {
  let component: SpacificBrandsComponent;
  let fixture: ComponentFixture<SpacificBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacificBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacificBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
