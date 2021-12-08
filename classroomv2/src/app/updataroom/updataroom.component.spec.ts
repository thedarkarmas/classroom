import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataroomComponent } from './updataroom.component';

describe('UpdataroomComponent', () => {
  let component: UpdataroomComponent;
  let fixture: ComponentFixture<UpdataroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdataroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdataroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
