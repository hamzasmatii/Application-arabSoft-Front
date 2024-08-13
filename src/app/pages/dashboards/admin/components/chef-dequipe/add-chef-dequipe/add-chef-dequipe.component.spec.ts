import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChefDequipeComponent } from './add-chef-dequipe.component';

describe('AddChefDequipeComponent', () => {
  let component: AddChefDequipeComponent;
  let fixture: ComponentFixture<AddChefDequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChefDequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChefDequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
