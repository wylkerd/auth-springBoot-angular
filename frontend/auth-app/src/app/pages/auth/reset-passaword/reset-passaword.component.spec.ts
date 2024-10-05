import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassawordComponent } from './reset-passaword.component';

describe('ResetPassawordComponent', () => {
  let component: ResetPassawordComponent;
  let fixture: ComponentFixture<ResetPassawordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassawordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
