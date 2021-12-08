import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameroomComponent } from './nameroom.component';

describe('NameroomComponent', () => {
  let component: NameroomComponent;
  let fixture: ComponentFixture<NameroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
