import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainclassComponent } from './mainclass.component';

describe('MainclassComponent', () => {
  let component: MainclassComponent;
  let fixture: ComponentFixture<MainclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
