import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDequipeComponent } from './chef-dequipe.component';

describe('ChefDequipeComponent', () => {
  let component: ChefDequipeComponent;
  let fixture: ComponentFixture<ChefDequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefDequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefDequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
